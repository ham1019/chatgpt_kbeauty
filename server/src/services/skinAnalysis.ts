// Skin Analysis Algorithm for Personalized Routine Generation
// SPEC-PERSONALIZED-ROUTINE-001

import { SkinLog } from '../auth/supabase.js';

export interface SkinAnalysisResult {
  average_hydration: number;
  average_oiliness: number;
  breakout_frequency: number;
  identified_patterns: string[];
  skin_type_assessment: "dry" | "oily" | "combination" | "sensitive" | "normal";
  recommended_focus: string[];
  data_quality: {
    total_logs: number;
    days_with_data: number;
    is_sufficient: boolean;
    message?: string;
  };
}

export interface SeasonalContext {
  current_season: "spring" | "summer" | "fall" | "winter";
  season_specific_tips: string[];
  recommended_adjustments: string[];
}

export interface RoutineStep {
  order: number;
  name: string;
  description: string;
  product_type: string;
  is_essential: boolean;
  tip?: string;
}

export interface PersonalizedRoutine {
  type: "morning" | "evening";
  steps: RoutineStep[];
  focus_areas: string[];
  estimated_time: string;
}

// 계절 판단 (한국 기준)
export function getCurrentSeason(): "spring" | "summer" | "fall" | "winter" {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "fall";
  return "winter";
}

// 계절별 컨텍스트 생성
export function getSeasonalContext(): SeasonalContext {
  const season = getCurrentSeason();

  const seasonData: Record<string, { tips: string[]; adjustments: string[] }> = {
    spring: {
      tips: [
        "봄철 꽃가루와 황사로 인한 피부 자극에 주의하세요",
        "가벼운 텍스처의 보습제로 전환할 시기입니다",
        "진정 성분(시카, 알로에)이 함유된 제품을 사용하세요"
      ],
      adjustments: [
        "클렌징 후 진정 토너 사용 권장",
        "외출 후 더블 클렌징 필수",
        "SPF 자외선 차단 강화"
      ]
    },
    summer: {
      tips: [
        "가벼운 젤 타입 제품으로 교체하세요",
        "자외선 차단제를 2-3시간마다 덧바르세요",
        "피지 조절을 위해 나이아신아마이드 제품 추천"
      ],
      adjustments: [
        "크림 대신 젤 또는 로션 타입 사용",
        "오일 프리 제품 선택",
        "SPF 50+ PA++++ 필수"
      ]
    },
    fall: {
      tips: [
        "여름 동안 받은 자외선 손상을 회복할 시기입니다",
        "비타민 C로 색소 침착 관리를 시작하세요",
        "보습력을 서서히 높여가세요"
      ],
      adjustments: [
        "브라이트닝 세럼 추가",
        "주 1-2회 각질 관리",
        "에센스 레이어링 시작"
      ]
    },
    winter: {
      tips: [
        "풍부한 보습제로 피부 장벽을 보호하세요",
        "실내 난방으로 인한 건조함에 주의하세요",
        "세라마이드 함유 제품으로 장벽 강화"
      ],
      adjustments: [
        "오일 또는 밤 제품 추가",
        "각질 관리 빈도 줄이기",
        "가습기 사용 권장"
      ]
    }
  };

  return {
    current_season: season,
    season_specific_tips: seasonData[season].tips,
    recommended_adjustments: seasonData[season].adjustments
  };
}

// 피부 기록 분석
export function analyzeSkinHistory(logs: SkinLog[], days: number = 14): SkinAnalysisResult {
  // 데이터 품질 체크
  const totalLogs = logs.length;
  const uniqueDays = new Set(logs.map(log => log.logged_at)).size;
  const isSufficient = uniqueDays >= 7;

  if (totalLogs === 0) {
    return {
      average_hydration: 0,
      average_oiliness: 0,
      breakout_frequency: 0,
      identified_patterns: [],
      skin_type_assessment: "normal",
      recommended_focus: ["hydration"],
      data_quality: {
        total_logs: 0,
        days_with_data: 0,
        is_sufficient: false,
        message: "피부 기록이 없습니다. 먼저 피부 상태를 기록해주세요."
      }
    };
  }

  // 평균 계산
  const hydrationValues = logs.filter(l => l.hydration !== null).map(l => l.hydration!);
  const oilinessValues = logs.filter(l => l.oiliness !== null).map(l => l.oiliness!);

  const avgHydration = hydrationValues.length > 0
    ? hydrationValues.reduce((a, b) => a + b, 0) / hydrationValues.length
    : 3;

  const avgOiliness = oilinessValues.length > 0
    ? oilinessValues.reduce((a, b) => a + b, 0) / oilinessValues.length
    : 3;

  // 트러블 빈도 계산
  const breakoutLogs = logs.filter(l => l.has_breakouts === true);
  const breakoutFrequency = totalLogs > 0 ? breakoutLogs.length / totalLogs : 0;

  // 패턴 식별
  const patterns: string[] = [];

  if (avgHydration <= 2) {
    patterns.push("낮은 수분 레벨이 지속됨");
  }
  if (avgOiliness >= 4) {
    patterns.push("높은 유분 레벨이 지속됨");
  }
  if (breakoutFrequency >= 0.4) {
    patterns.push("잦은 트러블 발생");
  }

  // 트러블 부위 분석
  const allBreakoutAreas = breakoutLogs.flatMap(l => l.breakout_areas || []);
  const areaCount: Record<string, number> = {};
  allBreakoutAreas.forEach(area => {
    areaCount[area] = (areaCount[area] || 0) + 1;
  });

  const frequentAreas = Object.entries(areaCount)
    .filter(([_, count]) => count >= 2)
    .map(([area, _]) => area);

  if (frequentAreas.length > 0) {
    patterns.push(`반복되는 트러블 부위: ${frequentAreas.join(', ')}`);
  }

  // 피부 타입 판단
  const skinType = determineSkinType(avgHydration, avgOiliness, breakoutFrequency);

  // 추천 포커스 결정
  const focus = determineRecommendedFocus(avgHydration, avgOiliness, breakoutFrequency, skinType);

  return {
    average_hydration: Math.round(avgHydration * 10) / 10,
    average_oiliness: Math.round(avgOiliness * 10) / 10,
    breakout_frequency: Math.round(breakoutFrequency * 100) / 100,
    identified_patterns: patterns,
    skin_type_assessment: skinType,
    recommended_focus: focus,
    data_quality: {
      total_logs: totalLogs,
      days_with_data: uniqueDays,
      is_sufficient: isSufficient,
      message: isSufficient ? undefined : `더 정확한 분석을 위해 ${7 - uniqueDays}일의 추가 기록이 필요합니다.`
    }
  };
}

// 피부 타입 결정
function determineSkinType(
  hydration: number,
  oiliness: number,
  breakoutFrequency: number
): "dry" | "oily" | "combination" | "sensitive" | "normal" {
  // 민감성 피부: 트러블이 잦고 수분이 낮은 경우
  if (breakoutFrequency >= 0.5 && hydration <= 2.5) {
    return "sensitive";
  }

  // 건성: 수분 낮고 유분도 낮음
  if (hydration <= 2.5 && oiliness <= 2.5) {
    return "dry";
  }

  // 지성: 유분이 높음
  if (oiliness >= 3.5 && hydration >= 3) {
    return "oily";
  }

  // 복합성: 수분 낮고 유분 높음 (T존 지성, U존 건성)
  if (hydration <= 3 && oiliness >= 3.5) {
    return "combination";
  }

  // 정상
  return "normal";
}

// 추천 포커스 결정
function determineRecommendedFocus(
  hydration: number,
  oiliness: number,
  breakoutFrequency: number,
  skinType: string
): string[] {
  const focus: string[] = [];

  // 수분 부족
  if (hydration <= 2.5) {
    focus.push("hydration");
  }

  // 유분 과다
  if (oiliness >= 4) {
    focus.push("oil_control");
  }

  // 트러블
  if (breakoutFrequency >= 0.3) {
    focus.push("acne");
  }

  // 기본 추천
  if (focus.length === 0) {
    if (skinType === "dry") focus.push("hydration");
    else if (skinType === "oily") focus.push("oil_control");
    else focus.push("brightening");
  }

  return focus;
}

// 개인화 루틴 생성
export function generateRoutines(
  analysis: SkinAnalysisResult,
  season: SeasonalContext,
  routineType: "morning" | "evening" | "both" = "both",
  focus?: string
): PersonalizedRoutine[] {
  const routines: PersonalizedRoutine[] = [];
  const primaryFocus = focus || analysis.recommended_focus[0] || "hydration";
  const skinType = analysis.skin_type_assessment;

  if (routineType === "morning" || routineType === "both") {
    routines.push(createMorningRoutine(skinType, primaryFocus, season));
  }

  if (routineType === "evening" || routineType === "both") {
    routines.push(createEveningRoutine(skinType, primaryFocus, season));
  }

  return routines;
}

function createMorningRoutine(
  skinType: string,
  focus: string,
  season: SeasonalContext
): PersonalizedRoutine {
  const steps: RoutineStep[] = [];
  const focusAreas: string[] = [focus];

  // Step 1: Cleansing
  const isWinter = season.current_season === "winter";
  steps.push({
    order: 1,
    name: isWinter ? "물 세안" : "저자극 클렌저",
    description: isWinter
      ? "미온수로 가볍게 세안하여 피부 유분막을 보존하세요"
      : "순한 저pH 클렌저로 밤새 쌓인 피지를 제거하세요",
    product_type: "cleanser",
    is_essential: true,
    tip: skinType === "oily" ? "지성 피부는 아침에도 클렌저 사용을 권장합니다" : undefined
  });

  // Step 2: Toner
  steps.push({
    order: 2,
    name: "토너",
    description: "피부결을 정돈하고 다음 단계 흡수를 도와줍니다",
    product_type: "toner",
    is_essential: true,
    tip: "토너는 세안 후 3초 이내에 바르면 효과적입니다"
  });

  // Step 3: Essence (for hydration focus or dry skin)
  if (focus === "hydration" || skinType === "dry") {
    steps.push({
      order: 3,
      name: "에센스",
      description: "히알루론산 함유 에센스로 수분층을 채워주세요",
      product_type: "essence",
      is_essential: true,
      tip: "손바닥으로 감싸듯 패팅하면 흡수가 좋아집니다"
    });
    focusAreas.push("deep_hydration");
  }

  // Step 4: Serum (based on focus)
  const serumInfo = getSerumByFocus(focus);
  steps.push({
    order: steps.length + 1,
    name: serumInfo.name,
    description: serumInfo.description,
    product_type: "serum",
    is_essential: true,
    tip: serumInfo.tip
  });

  // Step 5: Moisturizer
  const moisturizerType = getMoisturizerType(skinType, season.current_season);
  steps.push({
    order: steps.length + 1,
    name: moisturizerType.name,
    description: moisturizerType.description,
    product_type: "moisturizer",
    is_essential: true
  });

  // Step 6: Sunscreen (essential for morning)
  steps.push({
    order: steps.length + 1,
    name: "자외선 차단제",
    description: "SPF 50+ PA++++ 제품을 충분히 발라주세요",
    product_type: "sunscreen",
    is_essential: true,
    tip: "손가락 두 마디 분량을 사용하세요"
  });

  return {
    type: "morning",
    steps,
    focus_areas: focusAreas,
    estimated_time: `${steps.length * 1}-${steps.length * 2}분`
  };
}

function createEveningRoutine(
  skinType: string,
  focus: string,
  season: SeasonalContext
): PersonalizedRoutine {
  const steps: RoutineStep[] = [];
  const focusAreas: string[] = [focus, "repair", "nourishment"];

  // Step 1: Oil Cleanser (double cleanse)
  steps.push({
    order: 1,
    name: "오일 클렌저",
    description: "메이크업과 자외선 차단제를 녹여내세요",
    product_type: "oil_cleanser",
    is_essential: true,
    tip: "마른 얼굴에 사용하고 1분간 마사지하세요"
  });

  // Step 2: Water Cleanser
  steps.push({
    order: 2,
    name: "폼/젤 클렌저",
    description: "남은 잔여물과 불순물을 깨끗이 제거하세요",
    product_type: "cleanser",
    is_essential: true
  });

  // Step 3: Exfoliant (2-3 times per week note)
  const exfoliantType = skinType === "oily" || focus === "acne" ? "BHA" : "AHA";
  steps.push({
    order: 3,
    name: `${exfoliantType} 토너 (주 2-3회)`,
    description: skinType === "oily"
      ? "살리실산으로 모공 속 노폐물을 제거하세요"
      : "글리콜산으로 각질을 부드럽게 제거하세요",
    product_type: "exfoliant",
    is_essential: false,
    tip: "자극이 느껴지면 사용 빈도를 줄이세요"
  });

  // Step 4: Toner
  steps.push({
    order: 4,
    name: "하이드레이팅 토너",
    description: "피부를 진정시키고 수분을 공급하세요",
    product_type: "toner",
    is_essential: true
  });

  // Step 5: Essence
  steps.push({
    order: 5,
    name: "에센스",
    description: "피부 깊숙이 영양분을 전달하세요",
    product_type: "essence",
    is_essential: true
  });

  // Step 6: Treatment Serum
  const serumInfo = getSerumByFocus(focus, true);
  steps.push({
    order: 6,
    name: serumInfo.name,
    description: serumInfo.description,
    product_type: "serum",
    is_essential: true,
    tip: serumInfo.tip
  });

  // Step 7: Eye Cream
  steps.push({
    order: 7,
    name: "아이크림",
    description: "눈가 피부를 집중 케어하세요",
    product_type: "eye_cream",
    is_essential: false,
    tip: "약지로 가볍게 톡톡 두드려 바르세요"
  });

  // Step 8: Moisturizer/Night Cream
  const nightCream = getNightCreamType(skinType, season.current_season);
  steps.push({
    order: 8,
    name: nightCream.name,
    description: nightCream.description,
    product_type: "moisturizer",
    is_essential: true
  });

  // Step 9: Sleeping Pack (for dry skin or winter)
  if (skinType === "dry" || season.current_season === "winter") {
    steps.push({
      order: 9,
      name: "슬리핑 팩",
      description: "모든 스킨케어를 밀봉하여 밤새 수분을 가두세요",
      product_type: "sleeping_pack",
      is_essential: false,
      tip: "얇게 펴 바르고 아침에 세안으로 제거하세요"
    });
  }

  return {
    type: "evening",
    steps,
    focus_areas: focusAreas,
    estimated_time: `${steps.length * 1}-${steps.length * 2}분`
  };
}

function getSerumByFocus(focus: string, isEvening: boolean = false): { name: string; description: string; tip?: string } {
  const serums: Record<string, { name: string; description: string; tip?: string }> = {
    hydration: {
      name: "히알루론산 세럼",
      description: "다중 분자 히알루론산으로 깊은 수분 공급",
      tip: "촉촉한 피부에 바르면 효과가 배가됩니다"
    },
    oil_control: {
      name: "나이아신아마이드 세럼",
      description: "피지 조절과 모공 케어를 동시에",
      tip: "10% 이하 농도로 시작하세요"
    },
    acne: {
      name: isEvening ? "레티놀 세럼" : "시카 세럼",
      description: isEvening
        ? "피부 턴오버를 촉진하고 트러블 예방"
        : "자극받은 피부를 진정시키고 장벽 강화",
      tip: isEvening ? "처음에는 주 2-3회만 사용하세요" : undefined
    },
    brightening: {
      name: isEvening ? "레티놀 세럼" : "비타민 C 세럼",
      description: isEvening
        ? "피부 톤을 균일하게 하고 탄력 개선"
        : "안티옥시던트로 피부를 보호하고 톤업",
      tip: isEvening ? "레티놀 사용 시 자외선 차단 필수" : "빛과 공기에 민감하니 올바르게 보관하세요"
    },
    anti_aging: {
      name: isEvening ? "레티놀 세럼" : "펩타이드 세럼",
      description: isEvening
        ? "콜라겐 생성 촉진과 주름 개선"
        : "피부 탄력과 리프팅 효과",
      tip: "레티놀은 저녁에만 사용하세요"
    }
  };

  return serums[focus] || serums.hydration;
}

function getMoisturizerType(skinType: string, season: string): { name: string; description: string } {
  if (season === "summer" || skinType === "oily") {
    return {
      name: "젤 크림",
      description: "가볍고 산뜻하게 수분을 공급합니다"
    };
  }
  if (season === "winter" || skinType === "dry") {
    return {
      name: "리치 크림",
      description: "진한 보습으로 피부 장벽을 보호합니다"
    };
  }
  return {
    name: "수분 크림",
    description: "적절한 보습으로 피부 밸런스를 맞춥니다"
  };
}

function getNightCreamType(skinType: string, season: string): { name: string; description: string } {
  if (skinType === "dry" || season === "winter") {
    return {
      name: "영양 나이트 크림",
      description: "밤새 피부에 깊은 영양을 공급합니다"
    };
  }
  if (skinType === "oily") {
    return {
      name: "워터 슬리핑 크림",
      description: "가볍지만 효과적으로 수분을 충전합니다"
    };
  }
  return {
    name: "리페어 나이트 크림",
    description: "하루 동안 손상된 피부를 복구합니다"
  };
}

// 면책조항
export const DISCLAIMER = "이 루틴은 개인 피부 기록을 기반으로 한 일반적인 스킨케어 조언입니다. 의학적 진단이나 치료를 대체하지 않습니다. 피부 질환이 있거나 특정 성분에 알레르기가 있는 경우 전문 피부과 의사와 상담하세요.";
