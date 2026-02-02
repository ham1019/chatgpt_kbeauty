// OpenAI window.openai API types
export interface OpenAiGlobals {
  toolInput: Record<string, unknown>;
  toolOutput: ToolOutput;
  toolResponseMetadata: Record<string, unknown>;
  widgetState: Record<string, unknown> | null;
  setWidgetState: (state: Record<string, unknown>) => void;
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  sendFollowUpMessage: (options: { prompt: string }) => Promise<void>;
  uploadFile: (file: File) => Promise<{ fileId: string }>;
  getFileDownloadUrl: (options: { fileId: string }) => Promise<{ downloadUrl: string }>;
  requestDisplayMode: (options: { mode: 'inline' | 'fullscreen' | 'pip' }) => Promise<void>;
  requestClose: () => void;
  openExternal: (options: { href: string }) => void;
  theme: 'light' | 'dark';
  displayMode: 'inline' | 'fullscreen' | 'pip';
  locale: string;
  maxHeight: number;
  safeArea: { top: number; bottom: number; left: number; right: number };
}

declare global {
  interface Window {
    openai: OpenAiGlobals;
  }
  interface WindowEventMap {
    'openai:set_globals': CustomEvent<{ globals: Partial<OpenAiGlobals> }>;
  }
}

// Tool Output types
export interface ToolOutput {
  // Routine Guide
  skin_type?: string;
  routines?: Routine[];
  disclaimer?: string;

  // Ingredient Info
  ingredients?: Ingredient[];

  // Product Search
  products?: Product[];
  query_summary?: string;
  total_count?: number;
  filters_applied?: Record<string, unknown>;
}

// Data types
export interface RoutineStep {
  step_name: string;
  description: string;
  tips?: string;
}

export interface Routine {
  routine_type: 'morning' | 'evening';
  skin_type: string;
  steps: RoutineStep[];
}

export interface Ingredient {
  name: string;
  category: string;
  benefits: string[];
  best_for: string[];
  how_to_use?: string;
  avoid_mixing_with?: string[];
  fun_fact?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  product_type: string;
  skin_types: string[];
  key_ingredients: string[];
  price_range: 'budget' | 'mid' | 'premium';
  rating: number;
  description?: string;
}
