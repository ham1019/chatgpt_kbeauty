import React, { useState } from 'react';

// Types for K-Beauty Tips
interface KBeautyTip {
  id: string;
  title: string;
  category: 'morning' | 'evening' | 'weekly' | 'seasonal' | 'trending';
  content: string;
  source?: string;
  related_ingredients?: string[];
  skin_concerns?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface TrendingIngredient {
  id: string;
  name: string;
  korean_name?: string;
  why_trending: string;
  best_for: string[];
  how_to_use: string;
}

interface FeaturedRoutine {
  id: string;
  name: string;
  korean_name?: string;
  description: string;
  steps: string[];
  best_for: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  is_trending: boolean;
}

interface KBeautyTipsHubProps {
  tips: KBeautyTip[];
  trendingIngredients: TrendingIngredient[];
  featuredRoutine?: FeaturedRoutine;
  categoryFilter?: string;
  totalTipsAvailable?: number;
}

// Helper to get category label
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    morning: '아침',
    evening: '저녁',
    weekly: '주간',
    seasonal: '계절',
    trending: '트렌드',
    all: '전체'
  };
  return labels[category] || category;
}

// Helper to get category icon
function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    morning: '🌅',
    evening: '🌙',
    weekly: '📅',
    seasonal: '🌸',
    trending: '🔥'
  };
  return icons[category] || '💡';
}

// Helper to get difficulty badge color
function getDifficultyStyle(difficulty: string): { bg: string; color: string } {
  const styles: Record<string, { bg: string; color: string }> = {
    beginner: { bg: '#e8f5e9', color: '#2e7d32' },
    intermediate: { bg: '#fff3e0', color: '#e65100' },
    advanced: { bg: '#fce4ec', color: '#c2185b' }
  };
  return styles[difficulty] || styles.beginner;
}

function getDifficultyLabel(difficulty: string): string {
  const labels: Record<string, string> = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급'
  };
  return labels[difficulty] || difficulty;
}

export function KBeautyTipsHub({
  tips,
  trendingIngredients,
  featuredRoutine,
  categoryFilter,
  totalTipsAvailable
}: KBeautyTipsHubProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categoryFilter || 'all');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const categories = ['all', 'morning', 'evening', 'weekly', 'seasonal', 'trending'];

  const filteredTips = activeCategory === 'all'
    ? tips
    : tips.filter(tip => tip.category === activeCategory);

  return (
    <div className="kbeauty-tips-hub">
      {/* Featured Routine Highlight */}
      {featuredRoutine && (
        <div className="card" style={{
          background: 'linear-gradient(135deg, var(--accent-light), var(--bg-card))',
          borderLeft: '4px solid var(--accent)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '32px' }}>✨</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '15px' }}>{featuredRoutine.name}</span>
                {featuredRoutine.is_trending && (
                  <span style={{
                    fontSize: '10px',
                    background: 'var(--accent)',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>HOT</span>
                )}
              </div>
              {featuredRoutine.korean_name && (
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {featuredRoutine.korean_name}
                </div>
              )}
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                {featuredRoutine.description}
              </div>
              <div style={{ fontSize: '12px' }}>
                <strong>단계:</strong>
                <ol style={{ paddingLeft: '18px', margin: '6px 0 0 0' }}>
                  {featuredRoutine.steps.slice(0, 5).map((step, i) => (
                    <li key={i} style={{ marginBottom: '4px', color: 'var(--text-secondary)' }}>{step}</li>
                  ))}
                  {featuredRoutine.steps.length > 5 && (
                    <li style={{ color: 'var(--accent)' }}>외 {featuredRoutine.steps.length - 5}단계...</li>
                  )}
                </ol>
              </div>
              <div className="tag-list" style={{ marginTop: '10px' }}>
                {featuredRoutine.best_for.slice(0, 3).map((tag, i) => (
                  <span key={i} className="tag good">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        padding: '4px 0',
        marginBottom: '12px'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: '16px',
              background: activeCategory === cat ? 'var(--accent)' : 'var(--bg-secondary)',
              color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {cat !== 'all' && getCategoryIcon(cat)} {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Tips Cards */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon">💡</div>
          <div>
            <div className="card-title">K-Beauty 팁</div>
            <div className="card-subtitle">{filteredTips.length}개 팁</div>
          </div>
        </div>

        {filteredTips.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
            해당 카테고리에 팁이 없습니다.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            {filteredTips.map(tip => {
              const isExpanded = expandedTip === tip.id;
              const diffStyle = getDifficultyStyle(tip.difficulty);

              return (
                <div
                  key={tip.id}
                  className="ingredient-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span>{getCategoryIcon(tip.category)}</span>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{tip.title}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '10px',
                          background: 'var(--accent-light)',
                          color: 'var(--accent)',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>{getCategoryLabel(tip.category)}</span>
                        <span style={{
                          fontSize: '10px',
                          background: diffStyle.bg,
                          color: diffStyle.color,
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>{getDifficultyLabel(tip.difficulty)}</span>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s'
                    }}>▼</span>
                  </div>

                  {isExpanded && (
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {tip.content}
                      </div>
                      {tip.source && (
                        <div style={{ fontSize: '11px', color: 'var(--accent)', marginTop: '10px' }}>
                          📚 {tip.source}
                        </div>
                      )}
                      {tip.related_ingredients && tip.related_ingredients.length > 0 && (
                        <div style={{ marginTop: '10px' }}>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                            관련 성분:
                          </div>
                          <div className="tag-list">
                            {tip.related_ingredients.map((ing, i) => (
                              <span key={i} className="tag">{ing}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {tip.skin_concerns && tip.skin_concerns.length > 0 && (
                        <div style={{ marginTop: '8px' }}>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                            피부 고민:
                          </div>
                          <div className="tag-list">
                            {tip.skin_concerns.map((concern, i) => (
                              <span key={i} className="tag good">{concern}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Trending Ingredients Section */}
      {trendingIngredients.length > 0 && (
        <div className="card">
          <div className="card-header">
            <div className="card-icon">🔥</div>
            <div>
              <div className="card-title">트렌딩 성분</div>
              <div className="card-subtitle">지금 주목받는 K-Beauty 성분</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            {trendingIngredients.map(ingredient => (
              <div key={ingredient.id} className="ingredient-card">
                <div className="ingredient-name">
                  {ingredient.name}
                  {ingredient.korean_name && (
                    <span className="ingredient-category">{ingredient.korean_name}</span>
                  )}
                </div>
                <div className="ingredient-section">
                  <div className="ingredient-section-title">왜 트렌딩인가요?</div>
                  <div className="ingredient-description">{ingredient.why_trending}</div>
                </div>
                <div className="ingredient-section">
                  <div className="ingredient-section-title">사용법</div>
                  <div className="ingredient-description">{ingredient.how_to_use}</div>
                </div>
                <div className="tag-list" style={{ marginTop: '8px' }}>
                  {ingredient.best_for.slice(0, 3).map((tag, i) => (
                    <span key={i} className="tag good">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      {totalTipsAvailable && totalTipsAvailable > tips.length && (
        <div style={{
          textAlign: 'center',
          padding: '12px',
          fontSize: '12px',
          color: 'var(--text-secondary)'
        }}>
          총 {totalTipsAvailable}개의 팁 중 {tips.length}개를 표시 중
        </div>
      )}
    </div>
  );
}
