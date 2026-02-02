# Acceptance Criteria: SPEC-PERSONALIZED-ROUTINE-001

---
spec_id: SPEC-PERSONALIZED-ROUTINE-001
title: Personalized Routine Generator and K-Beauty Tips Content Hub
created: 2026-02-02
status: Planned
---

## 1. Overview

이 문서는 SPEC-PERSONALIZED-ROUTINE-001의 인수 기준을 정의합니다.

---

## 2. Feature 1: Personalized Routine Generator

### 2.1 Scenario: 충분한 피부 기록이 있는 사용자의 루틴 생성

```gherkin
Feature: Personalized Routine Generation
  As a logged-in user with skin history
  I want to receive a personalized skincare routine
  So that I can improve my skin condition based on my data

  Background:
    Given 사용자가 Google OAuth로 로그인되어 있다
    And 사용자가 최소 7일 이상의 피부 기록을 가지고 있다

  Scenario: 기본 개인화 루틴 생성
    When 사용자가 "generate_personalized_routine" 도구를 호출한다
    Then 시스템은 사용자의 피부 분석 결과를 반환해야 한다
    And 분석 결과에는 평균 수분 레벨이 포함되어야 한다
    And 분석 결과에는 평균 유분 레벨이 포함되어야 한다
    And 분석 결과에는 breakout 빈도가 포함되어야 한다
    And 시스템은 아침 루틴과 저녁 루틴을 모두 반환해야 한다
    And 각 루틴에는 단계별 가이드가 포함되어야 한다
    And 응답에는 의료 면책조항이 포함되어야 한다

  Scenario: 아침 루틴만 요청
    When 사용자가 "generate_personalized_routine" 도구를 routine_type="morning"으로 호출한다
    Then 시스템은 아침 루틴만 반환해야 한다
    And 저녁 루틴은 포함되지 않아야 한다

  Scenario: 특정 포커스로 루틴 요청
    When 사용자가 "generate_personalized_routine" 도구를 focus="hydration"으로 호출한다
    Then 시스템은 수분 집중 루틴을 반환해야 한다
    And 권장 제품에는 hyaluronic_acid 또는 ceramides 성분이 포함되어야 한다

  Scenario: 제품 추천 포함
    When 사용자가 "generate_personalized_routine" 도구를 include_products=true로 호출한다
    Then 시스템은 제품 추천 목록을 반환해야 한다
    And 각 제품에는 id, name, brand, product_type이 포함되어야 한다
    And 제품은 사용자의 피부 타입에 적합해야 한다
```

### 2.2 Scenario: 피부 기록이 부족한 사용자

```gherkin
  Scenario: 7일 미만의 기록을 가진 사용자
    Given 사용자가 Google OAuth로 로그인되어 있다
    And 사용자가 5일의 피부 기록만 가지고 있다
    When 사용자가 "generate_personalized_routine" 도구를 호출한다
    Then 시스템은 기본 루틴을 반환해야 한다
    And 응답에는 "더 정확한 분석을 위해 더 많은 기록이 필요합니다" 메시지가 포함되어야 한다
    And 응답에는 기록 일수가 포함되어야 한다
```

### 2.3 Scenario: 비인증 사용자

```gherkin
  Scenario: 로그인하지 않은 사용자
    Given 사용자가 로그인되어 있지 않다
    When 사용자가 "generate_personalized_routine" 도구를 호출한다
    Then 시스템은 인증 오류를 반환해야 한다
    And 응답에는 "로그인이 필요합니다" 메시지가 포함되어야 한다
    And 응답에는 _meta.mcp/www_authenticate가 포함되어야 한다
```

### 2.4 Scenario: 계절별 조정

```gherkin
  Scenario: 겨울철 루틴
    Given 현재 날짜가 1월이다
    And 사용자가 충분한 피부 기록을 가지고 있다
    When 사용자가 "generate_personalized_routine" 도구를 호출한다
    Then 응답의 seasonal_context.current_season은 "winter"여야 한다
    And seasonal_context.season_specific_tips에는 보습 관련 팁이 포함되어야 한다
    And 권장 루틴에는 더 풍부한 보습제가 포함되어야 한다

  Scenario: 여름철 루틴
    Given 현재 날짜가 7월이다
    And 사용자가 충분한 피부 기록을 가지고 있다
    When 사용자가 "generate_personalized_routine" 도구를 호출한다
    Then 응답의 seasonal_context.current_season은 "summer"여야 한다
    And seasonal_context.season_specific_tips에는 자외선 차단 관련 팁이 포함되어야 한다
    And 권장 루틴에는 가벼운 텍스처 제품이 포함되어야 한다
```

### 2.5 Scenario: 피부 상태별 분석

```gherkin
  Scenario: 건성 피부 분석
    Given 사용자의 평균 수분 레벨이 2.0이다
    And 사용자의 평균 유분 레벨이 1.5이다
    When 피부 분석이 수행된다
    Then skin_type_assessment는 "dry"여야 한다
    And recommended_focus에는 "hydration"이 포함되어야 한다

  Scenario: 지성 피부 분석
    Given 사용자의 평균 수분 레벨이 3.0이다
    And 사용자의 평균 유분 레벨이 4.5이다
    When 피부 분석이 수행된다
    Then skin_type_assessment는 "oily"여야 한다
    And recommended_focus에는 "oil_control"이 포함되어야 한다

  Scenario: 트러블 피부 분석
    Given 사용자가 최근 7일 중 4일 breakout이 있었다
    When 피부 분석이 수행된다
    Then identified_patterns에는 "frequent breakouts"가 포함되어야 한다
    And recommended_focus에는 "acne"가 포함되어야 한다

  Scenario: 복합성 피부 분석
    Given 사용자의 평균 수분 레벨이 2.5이다
    And 사용자의 평균 유분 레벨이 4.0이다
    When 피부 분석이 수행된다
    Then skin_type_assessment는 "combination"이어야 한다
```

---

## 3. Feature 2: K-Beauty Tips Content Hub

### 3.1 Scenario: 기본 팁 조회

```gherkin
Feature: K-Beauty Tips Content Hub
  As a user interested in K-Beauty
  I want to access Korean skincare tips and trends
  So that I can improve my skincare knowledge

  Scenario: 모든 카테고리 팁 조회
    When 사용자가 "get_kbeauty_tips" 도구를 호출한다
    Then 시스템은 팁 목록을 반환해야 한다
    And 각 팁에는 id, title, category, content가 포함되어야 한다
    And 기본적으로 5개의 팁이 반환되어야 한다

  Scenario: 특정 카테고리 팁 조회
    When 사용자가 "get_kbeauty_tips" 도구를 category="morning"으로 호출한다
    Then 모든 반환된 팁의 category는 "morning"이어야 한다

  Scenario: 팁 개수 지정
    When 사용자가 "get_kbeauty_tips" 도구를 limit=10으로 호출한다
    Then 최대 10개의 팁이 반환되어야 한다
```

### 3.2 Scenario: 피부 고민별 필터링

```gherkin
  Scenario: 여드름 관련 팁 조회
    When 사용자가 "get_kbeauty_tips" 도구를 skin_concern="acne"로 호출한다
    Then 반환된 팁들은 acne 관련 내용을 포함해야 한다
    And 각 팁의 skin_concerns 배열에 "acne"가 포함되어야 한다

  Scenario: 건조함 관련 팁 조회
    When 사용자가 "get_kbeauty_tips" 도구를 skin_concern="dryness"로 호출한다
    Then 반환된 팁들은 건조함 관련 내용을 포함해야 한다
```

### 3.3 Scenario: 트렌딩 성분

```gherkin
  Scenario: 트렌딩 성분 정보 조회
    When 사용자가 "get_kbeauty_tips" 도구를 category="trending"으로 호출한다
    Then 응답에는 trending_ingredients 배열이 포함되어야 한다
    And 각 성분에는 name, why_trending, best_for, how_to_use가 포함되어야 한다

  Scenario: 계절별 트렌딩 성분
    Given 현재 계절이 "winter"이다
    When 사용자가 "get_kbeauty_tips" 도구를 category="seasonal"로 호출한다
    Then 반환된 팁 중 일부는 겨울 스킨케어 관련이어야 한다
```

### 3.4 Scenario: 피처드 루틴

```gherkin
  Scenario: Glass Skin 루틴 조회
    When 사용자가 K-Beauty 팁을 요청하고 "glass skin"을 언급한다
    Then 응답에는 featured_routine이 포함되어야 한다
    And featured_routine.name은 "Glass Skin Routine"이어야 한다
    And featured_routine.steps 배열이 포함되어야 한다

  Scenario: Skip-Care 루틴 조회
    When 사용자가 K-Beauty 팁을 요청하고 "skip care" 또는 "미니멀"을 언급한다
    Then 응답에는 Skip-Care 관련 featured_routine이 포함될 수 있다
```

---

## 4. Non-Functional Requirements

### 4.1 Performance

```gherkin
  Scenario: 응답 시간
    When 사용자가 "generate_personalized_routine" 도구를 호출한다
    Then 응답 시간은 2초 이내여야 한다

  Scenario: K-Beauty 팁 응답 시간
    When 사용자가 "get_kbeauty_tips" 도구를 호출한다
    Then 응답 시간은 1초 이내여야 한다
```

### 4.2 Security

```gherkin
  Scenario: 인증 토큰 없이 개인 데이터 접근 시도
    Given 사용자가 유효한 인증 토큰 없이
    When "generate_personalized_routine" 도구를 호출한다
    Then 시스템은 401 또는 인증 오류를 반환해야 한다
    And 다른 사용자의 피부 데이터는 절대 노출되지 않아야 한다

  Scenario: 다른 사용자 데이터 접근 시도
    Given 사용자 A가 로그인되어 있다
    When 사용자 A가 개인화 루틴을 요청한다
    Then 반환된 분석에는 사용자 A의 데이터만 포함되어야 한다
    And 사용자 B의 데이터는 절대 포함되지 않아야 한다
```

### 4.3 Error Handling

```gherkin
  Scenario: 데이터베이스 오류
    Given 데이터베이스 연결에 문제가 있다
    When 사용자가 도구를 호출한다
    Then 시스템은 적절한 오류 메시지를 반환해야 한다
    And isError: true가 설정되어야 한다
    And 스택 트레이스나 민감한 정보는 노출되지 않아야 한다

  Scenario: 잘못된 입력 파라미터
    When 사용자가 "get_kbeauty_tips" 도구를 category="invalid_category"로 호출한다
    Then 시스템은 유효한 카테고리 목록과 함께 오류를 반환해야 한다
```

---

## 5. UI/UX Acceptance Criteria

### 5.1 PersonalizedRoutine Component

```gherkin
Feature: Personalized Routine Widget Display

  Scenario: Skin Analysis Summary 표시
    Given 개인화 루틴 응답을 받았다
    When 위젯이 렌더링된다
    Then Skin Analysis Summary Card가 표시되어야 한다
    And 수분 레벨이 시각적으로 표시되어야 한다 (예: 바 또는 아이콘)
    And 유분 레벨이 시각적으로 표시되어야 한다
    And 피부 타입 평가가 텍스트로 표시되어야 한다

  Scenario: 루틴 탭 전환
    Given 개인화 루틴 위젯이 표시되어 있다
    When 사용자가 "저녁" 탭을 클릭한다
    Then 저녁 루틴 단계가 표시되어야 한다
    And 아침 루틴 단계는 숨겨져야 한다

  Scenario: 제품 추천 그리드
    Given 제품 추천이 포함된 응답을 받았다
    When 위젯이 렌더링된다
    Then 제품 카드 그리드가 표시되어야 한다
    And 각 카드에는 제품명, 브랜드, 가격대가 표시되어야 한다

  Scenario: 면책조항 표시
    Given 개인화 루틴 위젯이 표시되어 있다
    Then 페이지 하단에 의료 면책조항이 표시되어야 한다
```

### 5.2 KBeautyTipsHub Component

```gherkin
Feature: K-Beauty Tips Hub Widget Display

  Scenario: 카테고리 필터 탭
    Given K-Beauty 팁 위젯이 표시되어 있다
    Then 카테고리 필터 탭이 표시되어야 한다
    And 탭에는 "전체", "아침", "저녁", "주간", "계절" 옵션이 포함되어야 한다

  Scenario: 팁 카드 표시
    Given K-Beauty 팁 응답을 받았다
    When 위젯이 렌더링된다
    Then 팁 카드 목록이 표시되어야 한다
    And 각 카드에는 제목과 카테고리 뱃지가 표시되어야 한다
    And 각 카드에는 난이도 표시가 포함되어야 한다

  Scenario: 트렌딩 성분 섹션
    Given 트렌딩 성분이 포함된 응답을 받았다
    When 위젯이 렌더링된다
    Then "트렌딩 성분" 섹션이 표시되어야 한다
    And 각 성분에는 이름과 "왜 트렌딩인지" 설명이 표시되어야 한다

  Scenario: 피처드 루틴 하이라이트
    Given 피처드 루틴이 포함된 응답을 받았다
    When 위젯이 렌더링된다
    Then 피처드 루틴 하이라이트 카드가 상단에 표시되어야 한다
    And 루틴 이름과 간단한 설명이 표시되어야 한다
```

---

## 6. Data Quality Criteria

### 6.1 Seed Data Requirements

```gherkin
Feature: Content Quality

  Scenario: 팁 콘텐츠 품질
    Given kbeauty_tips 테이블에 시드 데이터가 있다
    Then 최소 20개의 팁이 있어야 한다
    And 각 카테고리에 최소 3개의 팁이 있어야 한다
    And 각 팁의 content는 최소 100자 이상이어야 한다
    And 각 팁에는 source 또는 근거가 포함되어야 한다

  Scenario: 피처드 루틴 품질
    Given featured_routines 테이블에 시드 데이터가 있다
    Then 최소 3개의 루틴이 있어야 한다
    And 각 루틴에는 최소 3개의 단계가 있어야 한다
    And "Glass Skin Routine"이 포함되어야 한다

  Scenario: 트렌딩 성분 품질
    Given trending_ingredients 테이블에 시드 데이터가 있다
    Then 최소 10개의 성분이 있어야 한다
    And 각 성분에는 why_trending 설명이 포함되어야 한다
```

---

## 7. Test Cases Summary

| TC ID | 요구사항 | 시나리오 | 우선순위 |
|-------|----------|----------|----------|
| TC-PR-001 | REQ-PR-001 | 면책조항 포함 확인 | High |
| TC-PR-010 | REQ-PR-010 | 기본 개인화 루틴 생성 | High |
| TC-PR-011 | REQ-PR-011 | 7일 미만 기록 처리 | High |
| TC-PR-014 | REQ-PR-014 | 비인증 사용자 처리 | High |
| TC-PR-020 | REQ-PR-020 | 건성 피부 분석 | Medium |
| TC-PR-021 | REQ-PR-021 | 트러블 피부 분석 | Medium |
| TC-PR-023 | REQ-PR-023 | 겨울 계절 조정 | Medium |
| TC-PR-024 | REQ-PR-024 | 여름 계절 조정 | Medium |
| TC-TH-010 | REQ-TH-010 | 기본 팁 조회 | High |
| TC-TH-011 | REQ-TH-011 | 카테고리 필터링 | High |
| TC-TH-012 | REQ-TH-012 | 트렌딩 성분 조회 | Medium |
| TC-TH-020 | REQ-TH-020 | 피처드 루틴 표시 | Medium |

---

## 8. Definition of Done

### 8.1 Feature 완료 기준

- [ ] 모든 High 우선순위 테스트 케이스 통과
- [ ] 코드 리뷰 완료
- [ ] ESLint 오류 0
- [ ] TypeScript 타입 오류 0
- [ ] 응답 시간 < 2초 (개인화 루틴)
- [ ] 응답 시간 < 1초 (팁 조회)
- [ ] 면책조항 모든 개인화 응답에 포함
- [ ] 인증 로직 보안 검토 완료
- [ ] 시드 데이터 품질 기준 충족
- [ ] 위젯 UI 렌더링 정상 동작

### 8.2 SPEC 완료 기준

- [ ] 모든 Milestone 완료
- [ ] 모든 테스트 케이스 작성 및 실행
- [ ] 문서화 완료
- [ ] 배포 준비 완료

---

## Tags

```
<!-- TAG BLOCK - DO NOT MODIFY -->
SPEC-PERSONALIZED-ROUTINE-001
TC-PR-001, TC-PR-010, TC-PR-011, TC-PR-014
TC-PR-020, TC-PR-021, TC-PR-023, TC-PR-024
TC-TH-010, TC-TH-011, TC-TH-012, TC-TH-020
<!-- END TAG BLOCK -->
```
