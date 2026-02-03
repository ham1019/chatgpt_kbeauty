import React, { useState } from 'react';
import type { Product } from '../types';

// Types for personalized routine data
interface SkinAnalysis {
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

interface SeasonalContext {
  current_season: string;
  season_specific_tips: string[];
  recommended_adjustments: string[];
}

interface RoutineStep {
  order: number;
  name: string;
  description: string;
  product_type: string;
  is_essential: boolean;
  tip?: string;
}

interface PersonalizedRoutineData {
  type: 'morning' | 'evening';
  steps: RoutineStep[];
  focus_areas: string[];
  estimated_time: string;
}

interface PersonalizedRoutineProps {
  userSkinAnalysis: SkinAnalysis;
  seasonalContext: SeasonalContext;
  personalizedRoutines: PersonalizedRoutineData[];
  productRecommendations: Product[];
  nextSteps: string[];
  disclaimer: string;
}

// Helper to get skin type label in Korean
function getSkinTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    dry: '건성',
    oily: '지성',
    combination: '복합성',
    sensitive: '민감성',
    normal: '중성'
  };
  return labels[type] || type;
}

// Helper to get season label
function getSeasonLabel(season: string): string {
  const labels: Record<string, string> = {
    spring: '봄',
    summer: '여름',
    fall: '가을',
    winter: '겨울'
  };
  return labels[season] || season;
}

// Helper to render level bar
function LevelBar({ value, max = 5, color }: { value: number; max?: number; color: string }) {
  const percentage = (value / max) * 100;
  return (
    <div style={{
      width: '100%',
      height: '6px',
      background: 'var(--bg-secondary)',
      borderRadius: '3px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${percentage}%`,
        height: '100%',
        background: color,
        borderRadius: '3px',
        transition: 'width 0.3s ease'
      }} />
    </div>
  );
}

export function PersonalizedRoutine({
  userSkinAnalysis,
  seasonalContext,
  personalizedRoutines,
  productRecommendations,
  nextSteps,
  disclaimer
}: PersonalizedRoutineProps) {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');

  const morningRoutine = personalizedRoutines.find(r => r.type === 'morning');
  const eveningRoutine = personalizedRoutines.find(r => r.type === 'evening');
  const activeRoutine = activeTab === 'morning' ? morningRoutine : eveningRoutine;

  return (
    <div className="personalized-routine">
      {/* Data Quality Warning */}
      {!userSkinAnalysis.data_quality.is_sufficient && userSkinAnalysis.data_quality.message && (
        <div className="card" style={{ background: 'var(--accent-light)', marginBottom: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>Data Collection in Progress</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {userSkinAnalysis.data_quality.message}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skin Analysis Summary Card */}
      <div className="card" style={{ padding: '20px', marginBottom: '16px' }}>
        <div className="card-header" style={{ marginBottom: '16px' }}>
          <div>
            <div className="card-title">Skin Analysis Results</div>
            <div className="card-subtitle">
              {getSkinTypeLabel(userSkinAnalysis.skin_type_assessment)} skin type based on {userSkinAnalysis.data_quality.days_with_data} days of data
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
          {/* Hydration */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px' }}>Hydration Level</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{userSkinAnalysis.average_hydration.toFixed(1)}/5</span>
            </div>
            <LevelBar value={userSkinAnalysis.average_hydration} color="#4fc3f7" />
          </div>

          {/* Oiliness */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px' }}>Oil Level</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{userSkinAnalysis.average_oiliness.toFixed(1)}/5</span>
            </div>
            <LevelBar value={userSkinAnalysis.average_oiliness} color="#ffb74d" />
          </div>

          {/* Breakout Frequency */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px' }}>Breakout Frequency</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{Math.round(userSkinAnalysis.breakout_frequency * 100)}%</span>
            </div>
            <LevelBar value={userSkinAnalysis.breakout_frequency * 5} color="#ef5350" />
          </div>
        </div>

        {/* Identified Patterns */}
        {userSkinAnalysis.identified_patterns.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Identified Patterns</div>
            <div className="tag-list">
              {userSkinAnalysis.identified_patterns.map((pattern, i) => (
                <span key={i} className="tag">{pattern}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Seasonal Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--accent-light), var(--bg-card))', padding: '20px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px', paddingTop: '2px' }}>
            {getSeasonLabel(seasonalContext.current_season)}
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>
              Seasonal Skincare Tips
            </div>
            <ul style={{ fontSize: '12px', color: 'var(--text-secondary)', paddingLeft: '16px', margin: 0 }}>
              {seasonalContext.season_specific_tips.slice(0, 2).map((tip, i) => (
                <li key={i} style={{ marginBottom: '6px' }}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Routine Tabs */}
      {(morningRoutine || eveningRoutine) && (
        <div className="card" style={{ padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            {morningRoutine && (
              <button
                onClick={() => setActiveTab('morning')}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  background: activeTab === 'morning' ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: activeTab === 'morning' ? 'white' : 'var(--text-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                AM Routine
              </button>
            )}
            {eveningRoutine && (
              <button
                onClick={() => setActiveTab('evening')}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  background: activeTab === 'evening' ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: activeTab === 'evening' ? 'white' : 'var(--text-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                PM Routine
              </button>
            )}
          </div>

          {activeRoutine && (
            <>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Estimated time: {activeRoutine.estimated_time}
              </div>
              <ul className="routine-steps">
                {activeRoutine.steps.map((step, index) => (
                  <li key={index} className="routine-step">
                    <div className="step-number">{step.order}</div>
                    <div className="step-content">
                      <div className="step-name">
                        {step.name}
                        {!step.is_essential && (
                          <span style={{
                            fontSize: '10px',
                            background: 'var(--bg-secondary)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            marginLeft: '8px'
                          }}>선택</span>
                        )}
                      </div>
                      <div className="step-description">{step.description}</div>
                      {step.tip && (
                        <div className="step-tip">Tip: {step.tip}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {/* Product Recommendations */}
      {productRecommendations.length > 0 && (
        <div className="card" style={{ padding: '20px', marginBottom: '16px' }}>
          <div className="card-header" style={{ marginBottom: '16px' }}>
            <div>
              <div className="card-title">Recommended Products</div>
              <div className="card-subtitle">{productRecommendations.length} products</div>
            </div>
          </div>
          <div className="product-grid" style={{ marginTop: '16px', gap: '16px' }}>
            {productRecommendations.slice(0, 6).map((product, index) => (
              <div key={index} className="product-card" style={{ padding: '16px' }}>
                <div className="product-info">
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">{product.price_range}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      {nextSteps.length > 0 && (
        <div className="card" style={{ padding: '20px', marginBottom: '16px' }}>
          <div className="card-header" style={{ marginBottom: '16px' }}>
            <div className="card-title">Next Steps</div>
          </div>
          <ul style={{ fontSize: '13px', paddingLeft: '20px', margin: '16px 0 0 0' }}>
            {nextSteps.map((step, i) => (
              <li key={i} style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>{step}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="disclaimer" style={{ marginTop: '24px' }}>{disclaimer}</div>
    </div>
  );
}
