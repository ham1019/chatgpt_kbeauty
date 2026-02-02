import React, { useEffect } from 'react';
import { useToolOutput, useTheme } from './hooks';
import { RoutineGuide, IngredientInfo, ProductSearch } from './components';

export function App() {
  const toolOutput = useToolOutput();
  const theme = useTheme();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Determine which view to render based on tool output
  if (toolOutput?.routines) {
    return (
      <RoutineGuide
        skinType={toolOutput.skin_type ?? 'normal'}
        routines={toolOutput.routines}
        disclaimer={toolOutput.disclaimer}
      />
    );
  }

  if (toolOutput?.ingredients) {
    return (
      <IngredientInfo
        ingredients={toolOutput.ingredients}
        disclaimer={toolOutput.disclaimer}
      />
    );
  }

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
    <div className="empty-state">
      <div className="empty-state-icon">🧴</div>
      <p>Ask me about skincare routines, ingredients, or products!</p>
    </div>
  );
}
