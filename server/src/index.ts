import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import { AsyncLocalStorage } from "async_hooks";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from project root (parent of server folder)
dotenv.config({ path: join(__dirname, "../../.env") });

// Data imports
import { getIngredientInfo } from "./data/ingredients.js";
import { searchProducts } from "./data/products.js";
import { getRoutine } from "./data/routines.js";
import {
  kbeautyTips,
  trendingIngredients,
  featuredRoutines,
  getTipsByCategory,
  getTipsBySkinConcern,
  getTrendingIngredientsBySeason,
  getFeaturedRoutineByName
} from "./data/tips.js";

// Auth imports
import { getSupabaseClient, verifyToken, SkinLogInput, SkinLog } from "./auth/supabase.js";

// Services
import {
  analyzeSkinHistory,
  getSeasonalContext,
  generateRoutines,
  DISCLAIMER as PERSONALIZED_DISCLAIMER
} from "./services/skinAnalysis.js";

// Constants
const PORT = Number(process.env.PORT ?? 8787);
const MCP_PATH = "/mcp";
const DISCLAIMER = "This is general skincare information only. For persistent skin concerns, please consult a dermatologist.";
const OUTPUT_TEMPLATE = "ui://kbeauty-skin-guide/widget.html";

// Auth Context (AsyncLocalStorage for request-scoped auth)
interface AuthContext {
  userId?: string;
}
const authContext = new AsyncLocalStorage<AuthContext>();

function getCurrentUserId(): string | undefined {
  return authContext.getStore()?.userId;
}

// Load widget HTML
let WIDGET_HTML: string;
try {
  WIDGET_HTML = readFileSync(
    join(__dirname, "../../web/dist/widget.html"),
    "utf-8"
  );
  console.log("Widget HTML loaded successfully");
} catch (error) {
  console.error("Failed to load widget HTML:", error);
  WIDGET_HTML = "<html><body>Widget not found</body></html>";
}

// ============================================
// Tool Definitions with _meta on Descriptor
// ============================================
const TOOLS: Tool[] = [
  {
    name: "get_routine_guide",
    description: "Use this when the user asks about skincare routines, wants to know how to care for their skin type, or is starting a skincare journey. Returns step-by-step K-beauty routine information.",
    inputSchema: {
      type: "object" as const,
      properties: {
        skin_type: {
          type: "string",
          enum: ["dry", "oily", "combination", "sensitive", "normal"],
          description: "User's skin type"
        },
        concern: {
          type: "string",
          description: "Specific skin concern like 'acne', 'aging', 'dullness'"
        },
        routine_type: {
          type: "string",
          enum: ["morning", "evening", "both"],
          description: "Time of day for the routine"
        }
      }
    },
    _meta: {
      "openai/outputTemplate": OUTPUT_TEMPLATE
    }
  },
  {
    name: "get_ingredient_info",
    description: "Use this when the user asks about specific skincare ingredients, what they do, how to use them, or wants to compare ingredients. Returns detailed ingredient information including benefits and precautions.",
    inputSchema: {
      type: "object" as const,
      properties: {
        ingredients: {
          type: "array",
          items: { type: "string" },
          description: "List of ingredient names to look up, e.g. ['niacinamide', 'hyaluronic_acid']"
        },
        info_type: {
          type: "string",
          enum: ["benefits", "usage", "precautions", "all"],
          description: "Type of information to return"
        }
      },
      required: ["ingredients"]
    },
    _meta: {
      "openai/outputTemplate": OUTPUT_TEMPLATE
    }
  },
  {
    name: "search_products",
    description: "Use this when the user wants to find or browse K-beauty products. Can filter by product type, ingredients, skin type, or price range. Returns a list of products for exploration.",
    inputSchema: {
      type: "object" as const,
      properties: {
        product_type: {
          type: "string",
          enum: ["cleanser", "toner", "essence", "serum", "moisturizer", "sunscreen", "mask", "exfoliator"],
          description: "Type of product to search for"
        },
        ingredients: {
          type: "array",
          items: { type: "string" },
          description: "Filter by products containing these ingredients"
        },
        skin_type: {
          type: "string",
          enum: ["dry", "oily", "combination", "sensitive", "normal"],
          description: "Filter by suitable skin type"
        },
        price_range: {
          type: "string",
          enum: ["budget", "mid", "premium"],
          description: "Filter by price range"
        },
        limit: {
          type: "number",
          description: "Maximum number of products to return (default: 10)"
        }
      }
    },
    _meta: {
      "openai/outputTemplate": OUTPUT_TEMPLATE
    }
  },
  // Tool 4: log_skin_condition (OAuth required)
  {
    name: "log_skin_condition",
    description: "Use this when the user wants to log or record their daily skin condition. Requires sign-in. Saves hydration level, oiliness, breakouts, and notes.",
    inputSchema: {
      type: "object" as const,
      properties: {
        hydration: {
          type: "number",
          minimum: 1,
          maximum: 5,
          description: "Hydration level from 1 (very dry) to 5 (well hydrated)"
        },
        oiliness: {
          type: "number",
          minimum: 1,
          maximum: 5,
          description: "Oiliness level from 1 (not oily) to 5 (very oily)"
        },
        has_breakouts: {
          type: "boolean",
          description: "Whether the user has breakouts today"
        },
        breakout_areas: {
          type: "array",
          items: { type: "string" },
          description: "Areas with breakouts, e.g. ['forehead', 'chin', 'cheeks']"
        },
        notes: {
          type: "string",
          description: "Additional notes about skin condition"
        }
      }
    },
    annotations: {
      readOnlyHint: false
    },
    _meta: {
      "openai/outputTemplate": OUTPUT_TEMPLATE,
      "openai/requiresAuth": true
    }
  },
  // Tool 5: get_skin_history (OAuth required)
  {
    name: "get_skin_history",
    description: "Use this when the user wants to view their skin diary or history of logged skin conditions. Requires sign-in. Returns past entries.",
    inputSchema: {
      type: "object" as const,
      properties: {
        days: {
          type: "number",
          description: "Number of days to look back (default: 7)"
        },
        limit: {
          type: "number",
          description: "Maximum number of entries to return (default: 10)"
        }
      }
    },
    annotations: {
      readOnlyHint: true
    },
    _meta: {
      "openai/outputTemplate": OUTPUT_TEMPLATE,
      "openai/requiresAuth": true
    }
  },
  // Tool 6: generate_personalized_routine (OAuth required) - SPEC-PERSONALIZED-ROUTINE-001
  {
    name: "generate_personalized_routine",
    description: "Use this when the user wants a personalized skincare routine based on their skin history. Analyzes past skin logs to recommend a customized K-beauty routine with seasonal adjustments. Requires sign-in.",
    inputSchema: {
      type: "object" as const,
      properties: {
        routine_type: {
          type: "string",
          enum: ["morning", "evening", "both"],
          description: "Time of day for the routine (default: both)"
        },
        focus: {
          type: "string",
          enum: ["hydration", "oil_control", "anti_aging", "brightening", "acne"],
          description: "Specific focus area for the routine"
        },
        include_products: {
          type: "boolean",
          description: "Whether to include product recommendations (default: true)"
        }
      }
    },
    annotations: {
      readOnlyHint: true
    },
    _meta: {
      "openai/outputTemplate": OUTPUT_TEMPLATE,
      "openai/requiresAuth": true
    }
  },
  // Tool 7: get_kbeauty_tips - SPEC-PERSONALIZED-ROUTINE-001
  {
    name: "get_kbeauty_tips",
    description: "Use this when the user asks for K-beauty tips, skincare advice, trending ingredients, or wants to learn about Korean skincare techniques like glass skin routine or 7-skin method. Does not require sign-in.",
    inputSchema: {
      type: "object" as const,
      properties: {
        category: {
          type: "string",
          enum: ["morning", "evening", "weekly", "seasonal", "trending", "all"],
          description: "Category of tips to retrieve (default: all)"
        },
        skin_concern: {
          type: "string",
          description: "Filter tips by skin concern like 'acne', 'dryness', 'aging'"
        },
        limit: {
          type: "number",
          description: "Maximum number of tips to return (default: 5)"
        }
      }
    },
    _meta: {
      "openai/outputTemplate": OUTPUT_TEMPLATE
    }
  }
];

// ============================================
// Tool Handlers
// ============================================
type ToolArgs = Record<string, unknown>;

// Auth required response
function authRequiredResponse(serverUrl: string) {
  return {
    content: [{
      type: "text" as const,
      text: "Please sign in to access your skin diary."
    }],
    _meta: {
      "mcp/www_authenticate": [
        `Bearer resource_metadata="${serverUrl}/.well-known/oauth-protected-resource", error="insufficient_scope", error_description="Sign in required to continue"`
      ]
    },
    isError: true
  };
}

async function handleToolCall(name: string, args: ToolArgs, userId?: string) {
  switch (name) {
    case "get_routine_guide": {
      const skinType = (args.skin_type as string) ?? "normal";
      const routineType = args.routine_type as string | undefined;
      const routineTypes = routineType === "both" ? ["morning", "evening"] : [routineType ?? "morning"];
      const routines = routineTypes.map(type => getRoutine(skinType, type as "morning" | "evening")).filter(Boolean);

      return {
        structuredContent: {
          skin_type: skinType,
          routines,
          disclaimer: DISCLAIMER
        },
        content: [{
          type: "text" as const,
          text: `Here's your ${skinType} skin ${routineType ?? "morning"} routine guide.`
        }]
      };
    }

    case "get_ingredient_info": {
      const ingredientNames = (args.ingredients as string[]) ?? [];
      const results = ingredientNames.map(name => getIngredientInfo(name)).filter(Boolean);

      return {
        structuredContent: {
          ingredients: results,
          disclaimer: DISCLAIMER
        },
        content: [{
          type: "text" as const,
          text: `Here's information about ${ingredientNames.join(", ")}.`
        }]
      };
    }

    case "search_products": {
      const results = searchProducts(args as any);

      return {
        structuredContent: {
          query_summary: `${args.product_type ?? "All"} products${args.ingredients ? ` with ${(args.ingredients as string[]).join(", ")}` : ""}`,
          total_count: results.length,
          products: results,
          filters_applied: args
        },
        content: [{
          type: "text" as const,
          text: `Found ${results.length} products matching your criteria.`
        }]
      };
    }

    case "log_skin_condition": {
      if (!userId) {
        return authRequiredResponse(`https://${process.env.PUBLIC_HOST ?? "localhost:8787"}`);
      }

      const supabase = getSupabaseClient();
      const logData: SkinLogInput = {
        hydration: args.hydration as number,
        oiliness: args.oiliness as number,
        has_breakouts: args.has_breakouts as boolean,
        breakout_areas: args.breakout_areas as string[],
        notes: args.notes as string,
      };

      const { data, error } = await supabase
        .from("skin_logs")
        .upsert({
          user_id: userId,
          logged_at: new Date().toISOString().split("T")[0],
          ...logData,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "user_id,logged_at"
        })
        .select()
        .single();

      if (error) {
        return {
          content: [{
            type: "text" as const,
            text: `Failed to save skin log: ${error.message}`
          }],
          isError: true
        };
      }

      return {
        structuredContent: {
          success: true,
          log: data,
          message: "Skin condition logged successfully!"
        },
        content: [{
          type: "text" as const,
          text: "Your skin condition has been logged successfully!"
        }]
      };
    }

    case "get_skin_history": {
      if (!userId) {
        return authRequiredResponse(`https://${process.env.PUBLIC_HOST ?? "localhost:8787"}`);
      }

      const supabase = getSupabaseClient();
      const days = (args.days as number) ?? 7;
      const limit = (args.limit as number) ?? 10;

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from("skin_logs")
        .select("*")
        .eq("user_id", userId)
        .gte("logged_at", startDate.toISOString().split("T")[0])
        .order("logged_at", { ascending: false })
        .limit(limit);

      if (error) {
        return {
          content: [{
            type: "text" as const,
            text: `Failed to fetch skin history: ${error.message}`
          }],
          isError: true
        };
      }

      return {
        structuredContent: {
          skin_logs: data ?? [],
          total_count: data?.length ?? 0,
          period_days: days
        },
        content: [{
          type: "text" as const,
          text: `Found ${data?.length ?? 0} skin log entries from the past ${days} days.`
        }]
      };
    }

    // SPEC-PERSONALIZED-ROUTINE-001: Personalized Routine Generator
    case "generate_personalized_routine": {
      if (!userId) {
        return authRequiredResponse(`https://${process.env.PUBLIC_HOST ?? "localhost:8787"}`);
      }

      const supabase = getSupabaseClient();
      const routineType = (args.routine_type as "morning" | "evening" | "both") ?? "both";
      const focus = args.focus as string | undefined;
      const includeProducts = (args.include_products as boolean) ?? true;

      // Fetch user's skin history (last 14 days)
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 14);

      const { data: skinLogs, error } = await supabase
        .from("skin_logs")
        .select("*")
        .eq("user_id", userId)
        .gte("logged_at", startDate.toISOString().split("T")[0])
        .order("logged_at", { ascending: false });

      if (error) {
        return {
          content: [{
            type: "text" as const,
            text: `Failed to fetch skin history: ${error.message}`
          }],
          isError: true
        };
      }

      // Analyze skin history
      const analysis = analyzeSkinHistory(skinLogs as SkinLog[] ?? []);
      const seasonalContext = getSeasonalContext();
      const personalizedRoutines = generateRoutines(analysis, seasonalContext, routineType, focus);

      // Get product recommendations if requested
      let productRecommendations: any[] = [];
      if (includeProducts) {
        const skinType = analysis.skin_type_assessment;
        productRecommendations = searchProducts({
          skin_type: skinType,
          limit: 6
        });
      }

      // Generate next steps based on analysis
      const nextSteps: string[] = [];
      if (!analysis.data_quality.is_sufficient) {
        nextSteps.push("더 정확한 분석을 위해 매일 피부 상태를 기록해주세요");
      }
      if (analysis.recommended_focus.includes("hydration")) {
        nextSteps.push("수분 집중 관리: 히알루론산 제품을 추가해보세요");
      }
      if (analysis.recommended_focus.includes("acne")) {
        nextSteps.push("트러블 예방: 주 2-3회 BHA 각질 관리를 시도해보세요");
      }
      nextSteps.push("2주 후 루틴 효과를 확인하고 조정하세요");

      return {
        structuredContent: {
          user_skin_analysis: analysis,
          seasonal_context: seasonalContext,
          personalized_routines: personalizedRoutines,
          product_recommendations: productRecommendations,
          next_steps: nextSteps,
          disclaimer: PERSONALIZED_DISCLAIMER
        },
        content: [{
          type: "text" as const,
          text: `Based on your skin history, I've created a personalized ${routineType} routine for your ${analysis.skin_type_assessment} skin type. ${analysis.data_quality.message ?? ""}`
        }]
      };
    }

    // SPEC-PERSONALIZED-ROUTINE-001: K-Beauty Tips Content Hub
    case "get_kbeauty_tips": {
      const category = (args.category as string) ?? "all";
      const skinConcern = args.skin_concern as string | undefined;
      const limit = (args.limit as number) ?? 5;

      // Get tips based on filters
      let tips = skinConcern
        ? getTipsBySkinConcern(skinConcern)
        : getTipsByCategory(category);

      // Apply limit
      tips = tips.slice(0, limit);

      // Get seasonal context for trending ingredients
      const seasonalContext = getSeasonalContext();
      const seasonalIngredients = getTrendingIngredientsBySeason(seasonalContext.current_season);

      // Check if user is asking about specific routines
      let featuredRoutine = undefined;
      if (category === "trending" || category === "all") {
        // Return a trending featured routine
        featuredRoutine = featuredRoutines.find(r => r.is_trending);
      }

      // Check for specific routine mentions in skin_concern
      if (skinConcern) {
        const routineLookup = getFeaturedRoutineByName(skinConcern);
        if (routineLookup) {
          featuredRoutine = routineLookup;
        }
      }

      return {
        structuredContent: {
          tips,
          trending_ingredients: seasonalIngredients.slice(0, 5),
          featured_routine: featuredRoutine,
          category_filter: category,
          total_tips_available: kbeautyTips.length
        },
        content: [{
          type: "text" as const,
          text: `Here are ${tips.length} K-beauty tips${category !== "all" ? ` for ${category}` : ""}${skinConcern ? ` related to ${skinConcern}` : ""}.`
        }]
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ============================================
// Server Setup Function
// ============================================
function setupServer(): McpServer {
  const server = new McpServer({
    name: "kbeauty-skin-guide",
    version: "1.0.0",
  }, {
    capabilities: {
      tools: {},
      resources: {}
    }
  });

  // Register Resource with widgetCSP for deployment compliance
  server.resource(
    "widget.html",
    "ui://kbeauty-skin-guide/widget.html",
    { mimeType: "text/html+skybridge" },
    async () => ({
      contents: [{
        uri: "ui://kbeauty-skin-guide/widget.html",
        mimeType: "text/html+skybridge",
        text: WIDGET_HTML,
        _meta: {
          "openai/widgetPrefersBorder": true,
          "openai/widgetCSP": {
            connect_domains: process.env.SUPABASE_URL
              ? [process.env.SUPABASE_URL]
              : [],
            resource_domains: []
          }
        }
      }]
    })
  );

  // Override tools/list to include _meta on descriptors
  server.server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools: TOOLS };
  });

  // Override tools/call to handle tool execution
  server.server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
      // Get userId from async context (set at HTTP level)
      const userId = getCurrentUserId();
      const result = await handleToolCall(name, args ?? {}, userId);
      return result;
    } catch (error) {
      return {
        content: [{
          type: "text" as const,
          text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`
        }],
        isError: true
      };
    }
  });

  return server;
}

// ============================================
// Session Storage
// ============================================
const transports: Map<string, StreamableHTTPServerTransport> = new Map();

// ============================================
// HTTP Server Setup
// ============================================
const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, mcp-session-id, Authorization",
      "Access-Control-Expose-Headers": "mcp-session-id",
    });
    res.end();
    return;
  }

  // Health check at root
  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("K-Beauty Skin Guide MCP Server");
    return;
  }

  // Health check endpoint
  if (req.method === "GET" && url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  console.log("SUPABASE_URL at boot =", process.env.SUPABASE_URL);

  // OAuth Protected Resource Metadata (Google OAuth)
  if (req.method === "GET" && url.pathname === "/.well-known/oauth-protected-resource") {
    const host = req.headers.host;
    const origin = `https://${host}`;

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    });
    res.end(JSON.stringify({
      resource: origin,
      authorization_servers: ["https://accounts.google.com"],
      scopes_supported: ["openid", "email", "profile"],
    }));
    return;
  }

  // MCP endpoint
  if (url.pathname === MCP_PATH) {
    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Expose-Headers", "mcp-session-id");

    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    // Extract and verify Authorization header
    const authHeader = req.headers["authorization"];
    let userId: string | undefined;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      userId = await verifyToken(token) ?? undefined;
      if (userId) {
        console.log(`Authenticated user: ${userId}`);
      }
    }

    // Handle DELETE - close session
    if (req.method === "DELETE") {
      if (sessionId && transports.has(sessionId)) {
        const transport = transports.get(sessionId)!;
        await transport.close();
        transports.delete(sessionId);
        res.writeHead(200).end("Session closed");
      } else {
        res.writeHead(404).end("Session not found");
      }
      return;
    }

    // Handle GET - SSE stream for existing session
    if (req.method === "GET") {
      if (sessionId && transports.has(sessionId)) {
        const transport = transports.get(sessionId)!;
        await authContext.run({ userId }, async () => {
          await transport.handleRequest(req, res);
        });
      } else {
        res.writeHead(400).end("Session not found");
      }
      return;
    }

    // Handle POST
    if (req.method === "POST") {
      // Existing session
      if (sessionId && transports.has(sessionId)) {
        const transport = transports.get(sessionId)!;
        await authContext.run({ userId }, async () => {
          await transport.handleRequest(req, res);
        });
        return;
      }

      // New session - create server and transport
      const server = setupServer();

      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        enableJsonResponse: true,
      });

      // Store transport when session is created
      transport.onclose = () => {
        const sid = (transport as any).sessionId;
        if (sid && transports.has(sid)) {
          transports.delete(sid);
        }
      };

      await server.connect(transport);
      await authContext.run({ userId }, async () => {
        await transport.handleRequest(req, res);
      });

      // Get session ID from response and store transport
      const newSessionId = res.getHeader("mcp-session-id") as string;
      if (newSessionId) {
        transports.set(newSessionId, transport);
        console.log(`New session created: ${newSessionId}`);
      }

      return;
    }

    res.writeHead(405).end("Method not allowed");
    return;
  }

  // 404 for everything else
  res.writeHead(404).end("Not Found");
});

httpServer.listen(PORT, () => {
  console.log(`K-Beauty Skin Guide MCP Server listening on http://localhost:${PORT}${MCP_PATH}`);
});
