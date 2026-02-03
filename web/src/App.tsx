import React, { useEffect } from 'react';
import { useToolOutput, useTheme } from './hooks';
import {
  RoutineGuide,
  IngredientInfo,
  ProductSearch,
  PersonalizedRoutine,
  KBeautyTipsHub
} from './components';

export function App() {
  const toolOutput = useToolOutput();
  const theme = useTheme();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Determine which view to render based on tool output

  // SPEC-PERSONALIZED-ROUTINE-001: Personalized Routine
  if (toolOutput?.personalized_routines && toolOutput?.user_skin_analysis) {
    return (
      <PersonalizedRoutine
        userSkinAnalysis={toolOutput.user_skin_analysis}
        seasonalContext={toolOutput.seasonal_context!}
        personalizedRoutines={toolOutput.personalized_routines}
        productRecommendations={toolOutput.product_recommendations ?? []}
        nextSteps={toolOutput.next_steps ?? []}
        disclaimer={toolOutput.disclaimer ?? ''}
      />
    );
  }

  // SPEC-PERSONALIZED-ROUTINE-001: K-Beauty Tips Hub
  if (toolOutput?.tips) {
    return (
      <KBeautyTipsHub
        tips={toolOutput.tips}
        trendingIngredients={toolOutput.trending_ingredients ?? []}
        featuredRoutine={toolOutput.featured_routine}
        categoryFilter={toolOutput.category_filter}
        totalTipsAvailable={toolOutput.total_tips_available}
      />
    );
  }

  // Existing: Routine Guide
  if (toolOutput?.routines) {
    return (
      <RoutineGuide
        skinType={toolOutput.skin_type ?? 'normal'}
        routines={toolOutput.routines}
        disclaimer={toolOutput.disclaimer}
      />
    );
  }

  // Existing: Ingredient Info
  if (toolOutput?.ingredients) {
    return (
      <IngredientInfo
        ingredients={toolOutput.ingredients}
        disclaimer={toolOutput.disclaimer}
      />
    );
  }

  // Existing: Product Search
  if (toolOutput?.products) {
    return (
      <ProductSearch
        products={toolOutput.products}
        totalCount={toolOutput.total_count ?? toolOutput.products.length}
        querySummary={toolOutput.query_summary}
      />
    );
  }

  // Default empty state
  return (
    <div className="empty-state" style={{ padding: '48px 24px' }}>
      <p>Ask me about skincare routines, ingredients, or products.</p>
    </div>
  );
}
