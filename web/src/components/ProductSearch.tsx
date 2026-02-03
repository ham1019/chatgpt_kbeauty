import React from 'react';
import type { Product } from '../types';

interface ProductSearchProps {
  products: Product[];
  totalCount: number;
  querySummary?: string;
}

const PRICE_LABELS: Record<string, string> = {
  budget: '$',
  mid: '$$',
  premium: '$$$',
};

export function ProductSearch({ products, totalCount, querySummary }: ProductSearchProps) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="product-search">
      <div className="header" style={{ marginBottom: '24px' }}>
        <div>
          <div className="header-title">Product Explorer</div>
          <div className="header-subtitle">{totalCount} products found</div>
        </div>
      </div>

      <div className="product-grid" style={{ gap: '16px' }}>
        {products.map((product) => (
          <div key={product.id} className="product-card" style={{ padding: '16px' }}>
            <div className="product-brand">{product.brand}</div>
            <div className="product-name">{product.name}</div>
            <div className="product-meta">
              <span className="product-rating">★ {product.rating ?? '-'}</span>
              <span className="product-price">
                {PRICE_LABELS[product.price_range] ?? '$'}
              </span>
            </div>
            <div className="product-tags">
              {product.skin_types.slice(0, 2).map((type, i) => (
                <span key={i} className="product-tag">{type}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
