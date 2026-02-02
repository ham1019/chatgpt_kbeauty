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
        <div className="card" style={{ background: 'var(--accent-light)', marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '20px' }}>📊</span>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>데이터 수집 중</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {userSkinAnalysis.data_quality.message}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skin Analysis Summary Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon">📋</div>
          <div>
            <div className="card-title">피부 분석 결과</div>
            <div className="card-subtitle">
              {getSkinTypeLabel(userSkinAnalysis.skin_type_assessment)} 피부 · {userSkinAnalysis.data_quality.days_with_data}일 데이터 기반
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
          {/* Hydration */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px' }}>💧 수분 레벨</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{userSkinAnalysis.average_hydration.toFixed(1)}/5</span>
            </div>
            <LevelBar value={userSkinAnalysis.average_hydration} color="#4fc3f7" />
          </div>

          {/* Oiliness */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px' }}>✨ 유분 레벨</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{userSkinAnalysis.average_oiliness.toFixed(1)}/5</span>
            </div>
            <LevelBar value={userSkinAnalysis.average_oiliness} color="#ffb74d" />
          </div>

          {/* Breakout Frequency */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px' }}>🔴 트러블 빈도</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{Math.round(userSkinAnalysis.breakout_frequency * 100)}%</span>
            </div>
            <LevelBar value={userSkinAnalysis.breakout_frequency * 5} color="#ef5350" />
          </div>
        </div>

        {/* Identified Patterns */}
        {userSkinAnalysis.identified_patterns.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>발견된 패턴</div>
            <div className="tag-list">
              {userSkinAnalysis.identified_patterns.map((pattern, i) => (
                <span key={i} className="tag">{pattern}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Seasonal Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--accent-light), var(--bg-card))' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '24px' }}>
            {seasonalContext.current_season === 'spring' ? '🌸' :
             seasonalContext.current_season === 'summer' ? '☀️' :
             seasonalContext.current_season === 'fall' ? '🍂' : '❄️'}
          </span>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '6px' }}>
              {getSeasonLabel(seasonalContext.current_season)} 스킨케어 팁
            </div>
            <ul style={{ fontSize: '12px', color: 'var(--text-secondary)', paddingLeft: '16px', margin: 0 }}>
              {seasonalContext.season_specific_tips.slice(0, 2).map((tip, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Routine Tabs */}
      {(morningRoutine || eveningRoutine) && (
        <div className="card">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {morningRoutine && (
              <button
                onClick={() => setActiveTab('morning')}
                style={{
                  flex: 1,
                  padding: '10px',
                  border: 'none',
                  borderRadius: '8px',
                  background: activeTab === 'morning' ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: activeTab === 'morning' ? 'white' : 'var(--text-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                🌅 아침 루틴
              </button>
            )}
            {eveningRoutine && (
              <button
                onClick={() => setActiveTab('evening')}
                style={{
                  flex: 1,
                  padding: '10px',
                  border: 'none',
                  borderRadius: '8px',
                  background: activeTab === 'evening' ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: activeTab === 'evening' ? 'white' : 'var(--text-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                🌙 저녁 루틴
              </button>
            )}
          </div>

          {activeRoutine && (
            <>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                예상 소요 시간: {activeRoutine.estimated_time}
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
                        <div className="step-tip">💡 {step.tip}</div>
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
        <div className="card">
          <div className="card-header">
            <div className="card-icon">🧴</div>
            <div>
              <div className="card-title">추천 제품</div>
              <div className="card-subtitle">{productRecommendations.length}개 제품</div>
            </div>
          </div>
          <div className="product-grid" style={{ marginTop: '12px' }}>
            {productRecommendations.slice(0, 6).map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image">
                  <span style={{ fontSize: '32px' }}>🧴</span>
                </div>
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
        <div className="card">
          <div className="card-header">
            <div className="card-icon">🎯</div>
            <div className="card-title">다음 단계</div>
          </div>
          <ul style={{ fontSize: '13px', paddingLeft: '20px', margin: '12px 0 0 0' }}>
            {nextSteps.map((step, i) => (
              <li key={i} style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>{step}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="disclaimer">⚠️ {disclaimer}</div>
    </div>
  );
}
