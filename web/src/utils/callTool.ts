/**
 * Utility to call MCP tools from the widget UI
 * Wraps window.openai.callTool with type safety
 */

export interface CallToolOptions {
  /** Tool name to call */
  name: string;
  /** Arguments to pass to the tool */
  args: Record<string, unknown>;
}

export class CallToolError extends Error {
  constructor(message: string, public readonly toolName: string) {
    super(message);
    this.name = 'CallToolError';
  }
}

/**
 * Call an MCP tool from the widget
 * @param name - The tool name to call
 * @param args - Arguments to pass to the tool
 * @returns The tool's structured output
 * @throws CallToolError if callTool is not available or the call fails
 */
export async function callTool<T = unknown>(
  name: string,
  args: Record<string, unknown> = {}
): Promise<T> {
  if (!window.openai?.callTool) {
    throw new CallToolError(
      'callTool is not available. Make sure you are running in the ChatGPT widget environment.',
      name
    );
  }

  try {
    const result = await window.openai.callTool(name, args);
    return result as T;
  } catch (error) {
    throw new CallToolError(
      error instanceof Error ? error.message : 'Unknown error calling tool',
      name
    );
  }
}

/**
 * Type-safe tool callers for known tools
 */
export const tools = {
  /** Get skincare routine guide */
  getRoutineGuide: (args: {
    skin_type?: 'dry' | 'oily' | 'combination' | 'sensitive' | 'normal';
    concern?: string;
    routine_type?: 'morning' | 'evening' | 'both';
  }) => callTool('get_routine_guide', args),

  /** Get ingredient information */
  getIngredientInfo: (args: {
    ingredients: string[];
    info_type?: 'benefits' | 'usage' | 'precautions' | 'all';
  }) => callTool('get_ingredient_info', args),

  /** Search for products */
  searchProducts: (args: {
    product_type?: string;
    ingredients?: string[];
    skin_type?: string;
    price_range?: 'budget' | 'mid' | 'premium';
    limit?: number;
  }) => callTool('search_products', args),

  /** Log skin condition (requires auth) */
  logSkinCondition: (args: {
    hydration?: number;
    oiliness?: number;
    has_breakouts?: boolean;
    breakout_areas?: string[];
    notes?: string;
  }) => callTool('log_skin_condition', args),

  /** Get skin history (requires auth) */
  getSkinHistory: (args: {
    days?: number;
    limit?: number;
  }) => callTool('get_skin_history', args),
};
