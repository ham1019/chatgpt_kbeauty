# SPEC-PERSONALIZED-ROUTINE-001: Personalized Routine Generator + K-Beauty Tips Content Hub

---
spec_id: SPEC-PERSONALIZED-ROUTINE-001
title: Personalized Routine Generator and K-Beauty Tips Content Hub
created: 2026-02-02
status: Planned
priority: High
lifecycle_level: spec-anchored
assigned: manager-ddd
related_specs: []
epic: K-Beauty Personalization Features
---

## 1. Environment (환경)

### 1.1 시스템 컨텍스트

- **프로젝트**: kbeauty-skin-guide - K-Beauty 스킨케어 교육 및 추적 ChatGPT 플러그인
- **백엔드**: Node.js + Hono + MCP Protocol + Supabase
- **프론트엔드**: React Widget for OpenAI
- **인증**: Google OAuth (OpenAI ChatGPT 통합)

### 1.2 기존 시스템

| 구성 요소 | 설명 |
|-----------|------|
| MCP Server | `@modelcontextprotocol/sdk` 기반 HTTP 서버 |
| Database | Supabase PostgreSQL - `skin_logs` 테이블 |
| Widget | React 기반 OpenAI 임베디드 위젯 |
| Auth | Google OAuth + Supabase Service Key |

### 1.3 기존 MCP Tools

| Tool | 설명 | 인증 |
|------|------|------|
| `get_routine_guide` | 피부 타입별 루틴 가이드 | 불필요 |
| `get_ingredient_info` | 성분 정보 조회 | 불필요 |
| `search_products` | 제품 검색 | 불필요 |
| `log_skin_condition` | 피부 상태 기록 | 필요 |
| `get_skin_history` | 피부 기록 조회 | 필요 |

### 1.4 기존 데이터 구조

**skin_logs 테이블 스키마:**
```sql
- id: UUID
- user_id: string (Google sub)
- logged_at: date
- hydration: number (1-5)
- oiliness: number (1-5)
- has_breakouts: boolean
- breakout_areas: string[]
- notes: string
- created_at: timestamp
- updated_at: timestamp
```

---

## 2. Assumptions (가정)

### 2.1 기술적 가정

| ID | 가정 | 신뢰도 | 근거 | 틀릴 경우 리스크 | 검증 방법 |
|----|------|--------|------|------------------|-----------|
| A-01 | Supabase PostgreSQL은 분석 쿼리를 처리할 수 있다 | High | 기존 `skin_logs` 테이블 사용 중 | 별도 분석 DB 필요 | 로드 테스트 |
| A-02 | MCP 프로토콜은 복잡한 JSON 응답을 지원한다 | High | 기존 structured_content 사용 중 | 응답 단순화 필요 | 프로토타입 테스트 |
| A-03 | React Widget은 새로운 UI 컴포넌트를 수용할 수 있다 | High | 기존 3개 컴포넌트 동작 중 | 위젯 리팩토링 필요 | 컴포넌트 추가 테스트 |
| A-04 | ChatGPT는 한국어 컨텐츠를 적절히 처리한다 | High | K-Beauty 도메인 특성 | 영어 번역 필요 | 사용자 테스트 |

### 2.2 비즈니스 가정

| ID | 가정 | 신뢰도 | 근거 | 틀릴 경우 리스크 |
|----|------|--------|------|------------------|
| B-01 | 사용자는 최소 7일 이상의 피부 기록이 있다 | Medium | 신규 사용자는 기록 부족 | 기본 루틴 폴백 |
| B-02 | K-Beauty 트렌드 콘텐츠는 정기적 업데이트 불필요 | Medium | 타임리스한 팁 위주 | 콘텐츠 관리 시스템 필요 |
| B-03 | 계절별 조언은 한국 기후 기준이 적합하다 | High | K-Beauty 도메인 특성 | 지역화 필요 |

---

## 3. Requirements (요구사항) - EARS Format

### 3.1 Feature 1: Personalized Routine Generator

#### 3.1.1 Ubiquitous Requirements (항상)

| ID | 요구사항 |
|----|----------|
| REQ-PR-001 | 시스템은 **항상** 개인화 루틴 생성 시 의료 면책조항을 포함해야 한다 |
| REQ-PR-002 | 시스템은 **항상** 피부 데이터를 암호화하여 저장해야 한다 |
| REQ-PR-003 | 시스템은 **항상** 루틴 권장 사항에 제품 데이터베이스의 실제 제품을 연결해야 한다 |

#### 3.1.2 Event-Driven Requirements (이벤트 기반)

| ID | 요구사항 |
|----|----------|
| REQ-PR-010 | **WHEN** 사용자가 개인화 루틴을 요청하면 **THEN** 시스템은 피부 기록을 분석하고 맞춤 루틴을 생성해야 한다 |
| REQ-PR-011 | **WHEN** 피부 기록이 7일 미만이면 **THEN** 시스템은 기본 루틴과 함께 "더 많은 기록 필요" 메시지를 표시해야 한다 |
| REQ-PR-012 | **WHEN** 계절이 변경되면 **THEN** 시스템은 계절에 맞는 루틴 조정을 권장해야 한다 |
| REQ-PR-013 | **WHEN** 트레킹된 피부 상태가 급격히 변화하면 **THEN** 시스템은 루틴 조정을 권장해야 한다 |
| REQ-PR-014 | **WHEN** 사용자가 로그인하지 않은 상태에서 개인화 루틴을 요청하면 **THEN** 시스템은 로그인을 요청해야 한다 |

#### 3.1.3 State-Driven Requirements (상태 기반)

| ID | 요구사항 |
|----|----------|
| REQ-PR-020 | **IF** 사용자의 평균 수분 레벨이 2 이하이면 **THEN** 시스템은 수분 집중 루틴을 우선 권장해야 한다 |
| REQ-PR-021 | **IF** 사용자가 최근 7일 중 3일 이상 breakout이 있었다면 **THEN** 시스템은 진정/여드름 케어 루틴을 권장해야 한다 |
| REQ-PR-022 | **IF** 사용자의 유분 레벨이 높고 수분 레벨이 낮으면 **THEN** 시스템은 "지성-건조 복합성" 루틴을 권장해야 한다 |
| REQ-PR-023 | **IF** 현재 계절이 겨울(12-2월)이면 **THEN** 시스템은 보습 강화 제품을 추가 권장해야 한다 |
| REQ-PR-024 | **IF** 현재 계절이 여름(6-8월)이면 **THEN** 시스템은 가벼운 텍스처와 자외선 차단을 강조해야 한다 |

#### 3.1.4 Unwanted Requirements (금지)

| ID | 요구사항 |
|----|----------|
| REQ-PR-030 | 시스템은 의학적 진단이나 처방을 **하지 않아야 한다** |
| REQ-PR-031 | 시스템은 사용자의 피부 데이터를 제3자에게 **공유하지 않아야 한다** |
| REQ-PR-032 | 시스템은 인증되지 않은 사용자의 개인 피부 데이터에 **접근하지 않아야 한다** |

### 3.2 Feature 2: K-Beauty Tips Content Hub

#### 3.2.1 Ubiquitous Requirements (항상)

| ID | 요구사항 |
|----|----------|
| REQ-TH-001 | 시스템은 **항상** 팁 콘텐츠에 출처나 근거를 포함해야 한다 |
| REQ-TH-002 | 시스템은 **항상** 팁을 카테고리별로 분류하여 제공해야 한다 |

#### 3.2.2 Event-Driven Requirements (이벤트 기반)

| ID | 요구사항 |
|----|----------|
| REQ-TH-010 | **WHEN** 사용자가 K-Beauty 팁을 요청하면 **THEN** 시스템은 관련 팁 목록을 반환해야 한다 |
| REQ-TH-011 | **WHEN** 사용자가 특정 카테고리(아침/저녁/주간/계절)를 지정하면 **THEN** 시스템은 해당 카테고리의 팁만 필터링해야 한다 |
| REQ-TH-012 | **WHEN** 사용자가 트렌딩 성분을 요청하면 **THEN** 시스템은 최신 K-Beauty 트렌드 성분 정보를 제공해야 한다 |
| REQ-TH-013 | **WHEN** 사용자가 특정 피부 고민을 언급하면 **THEN** 시스템은 관련 팁을 우선 표시해야 한다 |

#### 3.2.3 Optional Requirements (선택적)

| ID | 요구사항 |
|----|----------|
| REQ-TH-020 | **가능하면** 시스템은 Glass Skin, Skip-Care 등 한국 뷰티 트렌드 루틴을 제공해야 한다 |
| REQ-TH-021 | **가능하면** 시스템은 계절별 한국 기후에 맞는 스킨케어 조언을 제공해야 한다 |
| REQ-TH-022 | **가능하면** 시스템은 K-Beauty 매거진 스타일의 읽기 쉬운 콘텐츠를 제공해야 한다 |

---

## 4. Specifications (사양)

### 4.1 New MCP Tools

#### 4.1.1 `generate_personalized_routine` Tool

```typescript
interface GeneratePersonalizedRoutineInput {
  routine_type?: "morning" | "evening" | "both";  // 기본값: "both"
  focus?: "hydration" | "oil_control" | "anti_aging" | "brightening" | "acne";
  include_products?: boolean;  // 기본값: true
}

interface GeneratePersonalizedRoutineOutput {
  user_skin_analysis: {
    average_hydration: number;
    average_oiliness: number;
    breakout_frequency: number;  // 최근 7일 중 breakout 있는 날 비율
    identified_patterns: string[];
    skin_type_assessment: string;
  };
  seasonal_context: {
    current_season: "spring" | "summer" | "fall" | "winter";
    season_specific_tips: string[];
  };
  personalized_routines: PersonalizedRoutine[];
  product_recommendations: ProductRecommendation[];
  next_steps: string[];
  disclaimer: string;
}
```

#### 4.1.2 `get_kbeauty_tips` Tool

```typescript
interface GetKBeautyTipsInput {
  category?: "morning" | "evening" | "weekly" | "seasonal" | "trending" | "all";
  skin_concern?: string;  // "acne", "dryness", "aging" 등
  limit?: number;  // 기본값: 5
}

interface GetKBeautyTipsOutput {
  tips: KBeautyTip[];
  trending_ingredients: TrendingIngredient[];
  featured_routine?: FeaturedRoutine;  // Glass Skin, Skip-Care 등
}

interface KBeautyTip {
  id: string;
  title: string;
  category: "morning" | "evening" | "weekly" | "seasonal";
  content: string;
  source?: string;
  related_ingredients?: string[];
  related_products?: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface TrendingIngredient {
  name: string;
  korean_name?: string;
  why_trending: string;
  best_for: string[];
  how_to_use: string;
}

interface FeaturedRoutine {
  name: string;  // "Glass Skin Routine", "Skip-Care" 등
  description: string;
  steps: string[];
  best_for: string[];
}
```

### 4.2 Database Schema Changes

#### 4.2.1 New Table: `kbeauty_tips`

```sql
CREATE TABLE kbeauty_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('morning', 'evening', 'weekly', 'seasonal', 'trending')),
  content TEXT NOT NULL,
  source VARCHAR(255),
  related_ingredients TEXT[],
  related_products TEXT[],
  skin_concerns TEXT[],
  difficulty VARCHAR(20) DEFAULT 'beginner',
  is_active BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tips_category ON kbeauty_tips(category);
CREATE INDEX idx_tips_skin_concerns ON kbeauty_tips USING GIN(skin_concerns);
```

#### 4.2.2 New Table: `featured_routines`

```sql
CREATE TABLE featured_routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  korean_name VARCHAR(100),
  description TEXT NOT NULL,
  steps JSONB NOT NULL,  -- Array of step objects
  best_for TEXT[],
  difficulty VARCHAR(20) DEFAULT 'intermediate',
  is_trending BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 4.2.3 New Table: `trending_ingredients`

```sql
CREATE TABLE trending_ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  korean_name VARCHAR(100),
  why_trending TEXT NOT NULL,
  best_for TEXT[],
  how_to_use TEXT,
  season VARCHAR(20),  -- 계절별 트렌드 연관
  trend_start_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.3 Frontend Components

#### 4.3.1 `PersonalizedRoutine.tsx`

```typescript
interface PersonalizedRoutineProps {
  skinAnalysis: UserSkinAnalysis;
  routines: PersonalizedRoutine[];
  productRecommendations: ProductRecommendation[];
  seasonalContext: SeasonalContext;
  disclaimer: string;
}
```

**UI 구성요소:**
- Skin Analysis Summary Card (수분/유분/트러블 시각화)
- Routine Steps (아침/저녁 탭)
- Product Recommendations Grid
- Seasonal Tips Banner

#### 4.3.2 `KBeautyTipsHub.tsx`

```typescript
interface KBeautyTipsHubProps {
  tips: KBeautyTip[];
  trendingIngredients: TrendingIngredient[];
  featuredRoutine?: FeaturedRoutine;
}
```

**UI 구성요소:**
- Category Filter Tabs
- Tip Cards Grid
- Trending Ingredients Section
- Featured Routine Highlight

### 4.4 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        ChatGPT Interface                        │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MCP Server (Node.js + Hono)                │
│  ┌──────────────────────┬──────────────────────────────────┐   │
│  │   Existing Tools     │        New Tools                  │   │
│  │  ─────────────────   │   ──────────────────────────────  │   │
│  │  get_routine_guide   │  generate_personalized_routine   │   │
│  │  get_ingredient_info │  get_kbeauty_tips                │   │
│  │  search_products     │                                   │   │
│  │  log_skin_condition  │                                   │   │
│  │  get_skin_history    │                                   │   │
│  └──────────────────────┴──────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Supabase PostgreSQL                          │
│  ┌────────────────┬───────────────┬───────────────────────┐    │
│  │   skin_logs    │ kbeauty_tips  │  trending_ingredients │    │
│  │  (existing)    │   (new)       │       (new)           │    │
│  └────────────────┴───────────────┴───────────────────────┘    │
│  ┌────────────────┐                                             │
│  │featured_routines│                                            │
│  │    (new)       │                                             │
│  └────────────────┘                                             │
└─────────────────────────────────────────────────────────────────┘
```

### 4.5 Skin Analysis Algorithm

```typescript
interface SkinAnalysisResult {
  skinType: "dry" | "oily" | "combination" | "sensitive" | "normal";
  primaryConcerns: string[];
  hydrationLevel: "low" | "medium" | "high";
  oilLevel: "low" | "medium" | "high";
  breakoutTrend: "improving" | "stable" | "worsening";
  recommendedFocus: string[];
}

// 분석 로직
function analyzeSkinHistory(logs: SkinLog[], days: number = 14): SkinAnalysisResult {
  // 1. 평균 수분/유분 레벨 계산
  // 2. Breakout 빈도 및 트렌드 분석
  // 3. 지역별 패턴 식별 (breakout_areas)
  // 4. 피부 타입 추론
  // 5. 주요 관심사 및 권장 포커스 결정
}
```

---

## 5. Traceability Matrix

| 요구사항 ID | 구현 컴포넌트 | 테스트 케이스 | 상태 |
|-------------|---------------|---------------|------|
| REQ-PR-001 | `generate_personalized_routine` output | TC-PR-001 | Planned |
| REQ-PR-010 | `generate_personalized_routine` handler | TC-PR-010 | Planned |
| REQ-PR-011 | `analyzeSkinHistory` fallback | TC-PR-011 | Planned |
| REQ-PR-020 | `analyzeSkinHistory` hydration check | TC-PR-020 | Planned |
| REQ-TH-001 | `KBeautyTip` interface | TC-TH-001 | Planned |
| REQ-TH-010 | `get_kbeauty_tips` handler | TC-TH-010 | Planned |

---

## 5.5 Infrastructure Prerequisites (가이드 준수 요구사항)

신규 기능 구현 전 공식 ChatGPT App 개발 가이드 준수를 위해 기존 코드에 추가해야 할 항목입니다.

### 5.5.1 widgetCSP 설정 (배포 필수)

현재 리소스 등록에 CSP가 누락되어 있습니다. 배포/심사 전 필수 추가:

```typescript
// server/src/index.ts - Resource 등록 시 _meta 추가
server.resource(
  "widget.html",
  "ui://kbeauty-skin-guide/widget.html",
  { mimeType: "text/html+skybridge" },
  async () => ({
    contents: [{
      uri: "ui://kbeauty-skin-guide/widget.html",
      mimeType: "text/html+skybridge",
      text: WIDGET_HTML,
      _meta: {
        "openai/widgetPrefersBorder": true,
        "openai/widgetCSP": {
          connect_domains: [process.env.SUPABASE_URL],
          resource_domains: []
        }
      }
    }]
  })
);
```

### 5.5.2 widgetState Hook 추가

UI 상태 저장/복원을 위한 hook 필요:

```typescript
// web/src/hooks/useWidgetState.ts
export function useWidgetState<T>(initialValue: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(
    window.openai?.widgetState ?? initialValue
  );

  const setWidgetState = useCallback((value: T) => {
    setState(value);
    window.openai?.setWidgetState?.(value);
  }, []);

  return [state, setWidgetState];
}
```

### 5.5.3 callTool Utility 추가

UI에서 서버 Tool 호출 기능 필요:

```typescript
// web/src/utils/callTool.ts
export async function callTool<T>(name: string, args: Record<string, unknown>): Promise<T> {
  if (!window.openai?.callTool) {
    throw new Error('callTool not available');
  }
  return window.openai.callTool(name, args) as Promise<T>;
}
```

### 5.5.4 요구사항 (EARS Format)

| ID | 요구사항 |
|----|----------|
| REQ-INFRA-001 | 시스템은 **항상** widgetCSP에 허용된 도메인을 명시해야 한다 |
| REQ-INFRA-002 | **WHEN** UI 상태가 변경되면 **THEN** 시스템은 widgetState로 저장해야 한다 |
| REQ-INFRA-003 | **WHEN** UI에서 서버 데이터 갱신이 필요하면 **THEN** 시스템은 callTool을 사용해야 한다 |

---

## 6. Dependencies

### 6.1 기존 의존성 (변경 없음)

- `@modelcontextprotocol/sdk`: ^1.12.0
- `@supabase/supabase-js`: ^2.89.0
- `zod`: ^3.24.0

### 6.2 추가 의존성 권장

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `date-fns` | ^3.6.0 | 날짜/계절 계산 |

---

## 7. Risks and Mitigations

| 리스크 | 영향 | 확률 | 완화 전략 |
|--------|------|------|-----------|
| 신규 사용자 데이터 부족 | High | High | 기본 루틴 폴백 + "기록 축적" 유도 메시지 |
| 부정확한 피부 분석 | Medium | Medium | 보수적 권장 + 의료 면책조항 |
| 콘텐츠 업데이트 부담 | Low | Medium | 타임리스 콘텐츠 위주 구성 |
| DB 쿼리 성능 | Low | Low | 인덱스 최적화 + 캐싱 고려 |

---

## 8. Glossary

| 용어 | 정의 |
|------|------|
| Glass Skin | 투명하고 윤기나는 피부를 목표로 하는 K-Beauty 루틴 |
| Skip-Care | 최소한의 단계로 효과적인 스킨케어를 추구하는 트렌드 |
| 7-Skin Method | 토너를 7겹 레이어링하는 한국 스킨케어 기법 |
| EARS Format | Easy Approach to Requirements Syntax |
| MCP | Model Context Protocol |

---

## Tags

```
<!-- TAG BLOCK - DO NOT MODIFY -->
SPEC-PERSONALIZED-ROUTINE-001
REQ-INFRA-001, REQ-INFRA-002, REQ-INFRA-003
REQ-PR-001, REQ-PR-002, REQ-PR-003
REQ-PR-010, REQ-PR-011, REQ-PR-012, REQ-PR-013, REQ-PR-014
REQ-PR-020, REQ-PR-021, REQ-PR-022, REQ-PR-023, REQ-PR-024
REQ-PR-030, REQ-PR-031, REQ-PR-032
REQ-TH-001, REQ-TH-002
REQ-TH-010, REQ-TH-011, REQ-TH-012, REQ-TH-013
REQ-TH-020, REQ-TH-021, REQ-TH-022
<!-- END TAG BLOCK -->
```
