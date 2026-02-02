# Implementation Plan: SPEC-PERSONALIZED-ROUTINE-001

---
spec_id: SPEC-PERSONALIZED-ROUTINE-001
title: Personalized Routine Generator and K-Beauty Tips Content Hub
created: 2026-02-02
status: Planned
---

## 1. Overview

이 문서는 SPEC-PERSONALIZED-ROUTINE-001의 구현 계획을 정의합니다.

**범위:**
- Feature 1: Personalized Routine Generator (개인화 루틴 생성기)
- Feature 2: K-Beauty Tips Content Hub (K-Beauty 팁 콘텐츠 허브)

**기술 스택:**
- Backend: Node.js + TypeScript + MCP Protocol
- Database: Supabase PostgreSQL
- Frontend: React + TypeScript (OpenAI Widget)

---

## 2. Milestones

### Milestone 1: Database Schema Setup (Primary Goal)

**목표:** 새로운 테이블 생성 및 시드 데이터 준비

**작업 항목:**

| 작업 | 설명 | 의존성 |
|------|------|--------|
| M1-01 | `kbeauty_tips` 테이블 생성 | None |
| M1-02 | `featured_routines` 테이블 생성 | None |
| M1-03 | `trending_ingredients` 테이블 생성 | None |
| M1-04 | 인덱스 생성 | M1-01, M1-02, M1-03 |
| M1-05 | 초기 시드 데이터 삽입 (팁 20개+, 루틴 5개+, 성분 10개+) | M1-04 |

**산출물:**
- Supabase 마이그레이션 스크립트
- 시드 데이터 JSON/SQL 파일

---

### Milestone 2: Backend - Skin Analysis Service (Primary Goal)

**목표:** 피부 기록 분석 알고리즘 구현

**작업 항목:**

| 작업 | 설명 | 의존성 |
|------|------|--------|
| M2-01 | `SkinAnalysisService` 클래스 생성 | M1 완료 |
| M2-02 | 평균 수분/유분 계산 로직 | M2-01 |
| M2-03 | Breakout 빈도 및 트렌드 분석 | M2-01 |
| M2-04 | 피부 타입 추론 알고리즘 | M2-02, M2-03 |
| M2-05 | 계절 컨텍스트 서비스 | M2-01 |
| M2-06 | 권장 포커스 결정 로직 | M2-04 |

**산출물:**
- `server/src/services/skin-analysis.ts`
- `server/src/services/season-context.ts`

**핵심 알고리즘:**

```typescript
// 피부 타입 추론 매트릭스
const SKIN_TYPE_MATRIX = {
  dry: { hydration: [1, 2.5], oiliness: [1, 2] },
  oily: { hydration: [2, 5], oiliness: [3.5, 5] },
  combination: { hydration: [2, 4], oiliness: [2.5, 4] },
  sensitive: { breakout_frequency: 0.3 },  // 30%+ breakout days
  normal: { hydration: [2.5, 4], oiliness: [2, 3.5] }
};
```

---

### Milestone 3: Backend - MCP Tools Implementation (Primary Goal)

**목표:** 새로운 MCP 도구 구현

**작업 항목:**

| 작업 | 설명 | 의존성 |
|------|------|--------|
| M3-01 | `generate_personalized_routine` Tool 정의 | M2 완료 |
| M3-02 | `generate_personalized_routine` 핸들러 구현 | M3-01 |
| M3-03 | `get_kbeauty_tips` Tool 정의 | M1 완료 |
| M3-04 | `get_kbeauty_tips` 핸들러 구현 | M3-03 |
| M3-05 | Tool 등록 및 TOOLS 배열 업데이트 | M3-02, M3-04 |
| M3-06 | 인증 체크 통합 (`generate_personalized_routine`) | M3-02 |

**산출물:**
- `server/src/tools/personalized-routine.ts`
- `server/src/tools/kbeauty-tips.ts`
- `server/src/index.ts` 업데이트

---

### Milestone 4: Backend - Data Services (Secondary Goal)

**목표:** 팁 및 트렌드 데이터 서비스 구현

**작업 항목:**

| 작업 | 설명 | 의존성 |
|------|------|--------|
| M4-01 | `KBeautyTipsService` 클래스 생성 | M1 완료 |
| M4-02 | 카테고리별 팁 조회 로직 | M4-01 |
| M4-03 | 피부 고민별 팁 필터링 | M4-01 |
| M4-04 | `TrendingIngredientsService` 클래스 생성 | M1 완료 |
| M4-05 | `FeaturedRoutinesService` 클래스 생성 | M1 완료 |

**산출물:**
- `server/src/services/kbeauty-tips.ts`
- `server/src/services/trending-ingredients.ts`
- `server/src/services/featured-routines.ts`

---

### Milestone 5: Frontend - React Components (Secondary Goal)

**목표:** 새로운 위젯 컴포넌트 구현

**작업 항목:**

| 작업 | 설명 | 의존성 |
|------|------|--------|
| M5-01 | `PersonalizedRoutine.tsx` 컴포넌트 생성 | M3 완료 |
| M5-02 | Skin Analysis Summary Card 구현 | M5-01 |
| M5-03 | Routine Steps 탭 UI 구현 | M5-01 |
| M5-04 | Product Recommendations Grid 구현 | M5-01 |
| M5-05 | `KBeautyTipsHub.tsx` 컴포넌트 생성 | M3 완료 |
| M5-06 | Category Filter Tabs 구현 | M5-05 |
| M5-07 | Tip Cards Grid 구현 | M5-05 |
| M5-08 | Trending Ingredients Section 구현 | M5-05 |
| M5-09 | Featured Routine Highlight 구현 | M5-05 |

**산출물:**
- `web/src/components/PersonalizedRoutine.tsx`
- `web/src/components/KBeautyTipsHub.tsx`
- `web/src/components/index.ts` 업데이트

---

### Milestone 6: Frontend - App Integration (Secondary Goal)

**목표:** App.tsx에 새 컴포넌트 통합

**작업 항목:**

| 작업 | 설명 | 의존성 |
|------|------|--------|
| M6-01 | `types.ts` 업데이트 (새 인터페이스 추가) | M5 완료 |
| M6-02 | `App.tsx` 조건부 렌더링 추가 | M6-01 |
| M6-03 | CSS 스타일 추가 | M6-02 |
| M6-04 | 위젯 빌드 및 테스트 | M6-03 |

**산출물:**
- `web/src/types.ts` 업데이트
- `web/src/App.tsx` 업데이트
- 빌드된 `widget.html`

---

### Milestone 7: Content Population (Final Goal)

**목표:** 실제 콘텐츠 작성 및 삽입

**작업 항목:**

| 작업 | 설명 | 의존성 |
|------|------|--------|
| M7-01 | 아침 팁 콘텐츠 작성 (5개+) | M1 완료 |
| M7-02 | 저녁 팁 콘텐츠 작성 (5개+) | M1 완료 |
| M7-03 | 주간 트리트먼트 팁 작성 (5개+) | M1 완료 |
| M7-04 | 계절별 팁 콘텐츠 작성 (8개+, 계절당 2개) | M1 완료 |
| M7-05 | Glass Skin 루틴 작성 | M1 완료 |
| M7-06 | Skip-Care 루틴 작성 | M1 완료 |
| M7-07 | 7-Skin Method 루틴 작성 | M1 완료 |
| M7-08 | 트렌딩 성분 콘텐츠 작성 (10개+) | M1 완료 |

**산출물:**
- `server/data/tips-seed.json`
- `server/data/routines-seed.json`
- `server/data/ingredients-seed.json`

---

### Milestone 8: Testing & Quality (Final Goal)

**목표:** 테스트 및 품질 검증

**작업 항목:**

| 작업 | 설명 | 의존성 |
|------|------|--------|
| M8-01 | Skin Analysis 단위 테스트 | M2 완료 |
| M8-02 | MCP Tools 통합 테스트 | M3 완료 |
| M8-03 | Frontend 컴포넌트 테스트 | M5 완료 |
| M8-04 | E2E 테스트 (MCP 프로토콜 통한) | M6 완료 |
| M8-05 | 성능 테스트 (DB 쿼리) | M4 완료 |
| M8-06 | 보안 검토 (인증 로직) | M3-06 완료 |

**산출물:**
- 테스트 파일 및 결과 보고서

---

## 3. Technical Approach

### 3.1 Skin Analysis Algorithm

**입력:** `skin_logs` 테이블의 최근 14일 데이터

**분석 단계:**

1. **데이터 집계**
   - 평균 수분 레벨 (1-5)
   - 평균 유분 레벨 (1-5)
   - Breakout 빈도 (%)
   - Breakout 영역 분포

2. **피부 타입 추론**
   ```
   IF avg_hydration < 2.5 AND avg_oiliness < 2 THEN "dry"
   ELSE IF avg_oiliness > 3.5 THEN "oily"
   ELSE IF abs(avg_hydration - avg_oiliness) > 1.5 THEN "combination"
   ELSE IF breakout_frequency > 0.3 THEN "sensitive"
   ELSE "normal"
   ```

3. **관심사 우선순위 결정**
   - 수분 레벨 기반: hydration focus
   - 유분 레벨 기반: oil control focus
   - Breakout 빈도 기반: acne focus
   - 트렌드 분석: improving/worsening

4. **계절 컨텍스트**
   - 현재 날짜 기반 계절 결정 (한국 기준)
   - 계절별 권장 사항 매핑

### 3.2 Product Recommendation Logic

**매칭 알고리즘:**

1. 분석된 피부 타입과 `products.skin_types` 매칭
2. 주요 관심사와 `products.concerns` 매칭
3. 계절별 권장 성분과 `products.key_ingredients` 매칭
4. 결과 정렬: 매칭 점수 + 평점

```typescript
function scoreProduct(product: Product, analysis: SkinAnalysisResult): number {
  let score = 0;

  // 피부 타입 매칭
  if (product.skin_types.includes(analysis.skinType)) score += 3;

  // 관심사 매칭
  const concernMatches = product.concerns.filter(c =>
    analysis.primaryConcerns.includes(c)
  ).length;
  score += concernMatches * 2;

  // 계절 성분 매칭
  const seasonalIngredients = getSeasonalIngredients(analysis.season);
  const ingredientMatches = product.key_ingredients.filter(i =>
    seasonalIngredients.includes(i)
  ).length;
  score += ingredientMatches;

  // 평점 가중치
  score += (product.rating ?? 4) / 2;

  return score;
}
```

### 3.3 File Structure

```
server/
├── src/
│   ├── index.ts                    # 기존 (업데이트)
│   ├── auth/
│   │   └── supabase.ts             # 기존
│   ├── data/
│   │   ├── ingredients.ts          # 기존
│   │   ├── products.ts             # 기존
│   │   └── routines.ts             # 기존
│   ├── services/                   # 신규 디렉토리
│   │   ├── skin-analysis.ts        # 신규
│   │   ├── season-context.ts       # 신규
│   │   ├── kbeauty-tips.ts         # 신규
│   │   ├── trending-ingredients.ts # 신규
│   │   └── featured-routines.ts    # 신규
│   └── tools/                      # 신규 디렉토리
│       ├── personalized-routine.ts # 신규
│       └── kbeauty-tips.ts         # 신규
└── data/                           # 시드 데이터
    ├── tips-seed.json              # 신규
    ├── routines-seed.json          # 신규
    └── ingredients-seed.json       # 신규

web/
└── src/
    ├── App.tsx                     # 업데이트
    ├── types.ts                    # 업데이트
    └── components/
        ├── index.ts                # 업데이트
        ├── PersonalizedRoutine.tsx # 신규
        └── KBeautyTipsHub.tsx      # 신규
```

---

## 4. Architecture Decisions

### AD-01: 서비스 레이어 분리

**결정:** 비즈니스 로직을 별도의 서비스 클래스로 분리

**근거:**
- 테스트 용이성 향상
- 코드 재사용성 증가
- 관심사 분리 원칙 준수

**대안 검토:**
- 인라인 로직 (기존 방식) - 단순하지만 테스트 어려움
- 함수형 유틸리티 - 상태 관리 어려움

### AD-02: 정적 콘텐츠 vs 데이터베이스

**결정:** K-Beauty 팁 콘텐츠를 데이터베이스에 저장

**근거:**
- 향후 콘텐츠 관리 용이
- 동적 필터링 및 검색 지원
- view_count 등 분석 가능

**대안 검토:**
- 정적 JSON 파일 - 배포 필요, 검색 제한
- CMS 통합 - 오버엔지니어링

### AD-03: 인증 요구 범위

**결정:** `generate_personalized_routine`은 인증 필수, `get_kbeauty_tips`는 인증 불필요

**근거:**
- 개인화 루틴은 사용자 데이터 필요
- 일반 팁은 공개 콘텐츠

---

## 5. Risk Mitigation

| 리스크 | 완화 전략 | 담당 |
|--------|----------|------|
| 신규 사용자 데이터 부족 | 7일 미만 시 기본 루틴 + 안내 메시지 | M2-04 |
| 분석 정확도 | 보수적 권장 + 면책조항 필수 | M3-02 |
| DB 성능 | 적절한 인덱스 + 쿼리 최적화 | M1-04 |
| 콘텐츠 품질 | 검증된 K-Beauty 정보 소스 활용 | M7 전체 |

---

## 6. Quality Gates

| 게이트 | 기준 | 검증 시점 |
|--------|------|----------|
| 코드 품질 | ESLint 오류 0, 타입 오류 0 | 각 PR |
| 테스트 커버리지 | 새 코드 80% 이상 | M8 |
| 성능 | 응답 시간 < 2초 | M8-05 |
| 보안 | 인증 우회 불가 | M8-06 |

---

## Tags

```
<!-- TAG BLOCK - DO NOT MODIFY -->
SPEC-PERSONALIZED-ROUTINE-001
M1, M2, M3, M4, M5, M6, M7, M8
AD-01, AD-02, AD-03
<!-- END TAG BLOCK -->
```
