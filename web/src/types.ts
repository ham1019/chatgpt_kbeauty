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

  // Personalized Routine (SPEC-PERSONALIZED-ROUTINE-001)
  user_skin_analysis?: SkinAnalysis;
  seasonal_context?: SeasonalContext;
  personalized_routines?: PersonalizedRoutineData[];
  product_recommendations?: Product[];
  next_steps?: string[];

  // K-Beauty Tips (SPEC-PERSONALIZED-ROUTINE-001)
  tips?: KBeautyTip[];
  trending_ingredients?: TrendingIngredient[];
  featured_routine?: FeaturedRoutine;
  category_filter?: string;
  total_tips_available?: number;
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

// SPEC-PERSONALIZED-ROUTINE-001: Personalized Routine Types
export interface SkinAnalysis {
  average_hydration: number;
  average_oiliness: number;
  breakout_frequency: number;
  identified_patterns: string[];
  skin_type_assessment: string;
  recommended_focus: string[];
  data_quality: {
    total_logs: number;
    days_with_data: number;
    is_sufficient: boolean;
    message?: string;
  };
}

export interface SeasonalContext {
  current_season: string;
  season_specific_tips: string[];
  recommended_adjustments: string[];
}

export interface PersonalizedRoutineStep {
  order: number;
  name: string;
  description: string;
  product_type: string;
  is_essential: boolean;
  tip?: string;
}

export interface PersonalizedRoutineData {
  type: 'morning' | 'evening';
  steps: PersonalizedRoutineStep[];
  focus_areas: string[];
  estimated_time: string;
}

// SPEC-PERSONALIZED-ROUTINE-001: K-Beauty Tips Types
export interface KBeautyTip {
  id: string;
  title: string;
  category: 'morning' | 'evening' | 'weekly' | 'seasonal' | 'trending';
  content: string;
  source?: string;
  related_ingredients?: string[];
  skin_concerns?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TrendingIngredient {
  id: string;
  name: string;
  korean_name?: string;
  why_trending: string;
  best_for: string[];
  how_to_use: string;
}

export interface FeaturedRoutine {
  id: string;
  name: string;
  korean_name?: string;
  description: string;
  steps: string[];
  best_for: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  is_trending: boolean;
}
