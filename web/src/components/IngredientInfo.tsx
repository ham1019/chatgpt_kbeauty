import React from 'react';
import type { Ingredient } from '../types';

interface IngredientInfoProps {
  ingredients: Ingredient[];
  disclaimer?: string;
}

export function IngredientInfo({ ingredients, disclaimer }: IngredientInfoProps) {
  if (ingredients.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔬</div>
        <p>No ingredient information found.</p>
      </div>
    );
  }

  return (
    <div className="ingredient-info">
      <div className="header">
        <div className="header-icon">🔬</div>
        <div>
          <div className="header-title">Ingredient Guide</div>
          <div className="header-subtitle">
            {ingredients.length} ingredient{ingredients.length > 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-card">
          <div className="ingredient-name">
            {ingredient.name}
            <span className="ingredient-category">
              {ingredient.category?.replace('_', ' ') ?? 'General'}
            </span>
          </div>

          <div className="ingredient-section">
            <div className="ingredient-section-title">Benefits</div>
            <div className="tag-list">
              {ingredient.benefits.map((benefit, i) => (
                <span key={i} className="tag good">{benefit}</span>
              ))}
            </div>
          </div>

          <div className="ingredient-section">
            <div className="ingredient-section-title">Best For</div>
            <div className="tag-list">
              {ingredient.best_for.map((type, i) => (
                <span key={i} className="tag">{type} skin</span>
              ))}
            </div>
          </div>

          {ingredient.how_to_use && (
            <div className="ingredient-section">
              <div className="ingredient-section-title">How to Use</div>
              <p className="ingredient-description">{ingredient.how_to_use}</p>
            </div>
          )}

          {ingredient.avoid_mixing_with && ingredient.avoid_mixing_with.length > 0 && (
            <div className="ingredient-section">
              <div className="ingredient-section-title">Avoid Mixing With</div>
              <div className="tag-list">
                {ingredient.avoid_mixing_with.map((item, i) => (
                  <span key={i} className="tag warning">{item.replace('_', ' ')}</span>
                ))}
              </div>
            </div>
          )}

          {ingredient.fun_fact && (
            <div className="ingredient-fun-fact">
              <span>✨ {ingredient.fun_fact}</span>
            </div>
          )}
        </div>
      ))}

      {disclaimer && <div className="disclaimer">ℹ️ {disclaimer}</div>}
    </div>
  );
}
