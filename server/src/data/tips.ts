// K-Beauty Tips, Trending Ingredients, and Featured Routines
// SPEC-PERSONALIZED-ROUTINE-001

export interface KBeautyTip {
  id: string;
  title: string;
  category: "morning" | "evening" | "weekly" | "seasonal" | "trending";
  content: string;
  source?: string;
  related_ingredients?: string[];
  related_products?: string[];
  skin_concerns?: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface TrendingIngredient {
  id: string;
  name: string;
  korean_name?: string;
  why_trending: string;
  best_for: string[];
  how_to_use: string;
  season?: string;
}

export interface FeaturedRoutine {
  id: string;
  name: string;
  korean_name?: string;
  description: string;
  steps: string[];
  best_for: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  is_trending: boolean;
}

export const kbeautyTips: KBeautyTip[] = [
  // Morning Tips
  {
    id: "tip_morning_01",
    title: "Water Splash Cleansing",
    category: "morning",
    content: "Skip the cleanser in the morning and just splash your face with lukewarm water. This Korean method preserves your skin's natural oils and prevents over-cleansing. If you have oily skin, use a gentle, low-pH cleanser instead.",
    source: "Korean dermatologist recommendation",
    related_ingredients: ["ceramides"],
    skin_concerns: ["dryness", "sensitivity"],
    difficulty: "beginner"
  },
  {
    id: "tip_morning_02",
    title: "Essence Patting Technique",
    category: "morning",
    content: "After toner, pat your essence into your skin using your palms. The warmth helps absorption, and the patting motion stimulates circulation. Apply to slightly damp skin for better penetration.",
    source: "K-beauty routine basics",
    related_ingredients: ["hyaluronic_acid", "niacinamide"],
    skin_concerns: ["dullness", "dehydration"],
    difficulty: "beginner"
  },
  {
    id: "tip_morning_03",
    title: "Sunscreen as Final Step",
    category: "morning",
    content: "Always apply sunscreen as the final step of your morning routine, even on cloudy days. Use two finger-lengths of sunscreen and reapply every 2-3 hours when outdoors. Korean sunscreens are known for lightweight, non-greasy formulas.",
    source: "Korean dermatology guidelines",
    related_products: ["sunscreen"],
    skin_concerns: ["aging", "hyperpigmentation"],
    difficulty: "beginner"
  },
  {
    id: "tip_morning_04",
    title: "3-Second Rule for Toner",
    category: "morning",
    content: "Apply your toner within 3 seconds of drying your face. This helps lock in moisture when your skin is most receptive. Korean toners are typically hydrating, not astringent like Western toners.",
    source: "K-beauty hydration principle",
    related_ingredients: ["hyaluronic_acid"],
    skin_concerns: ["dryness", "dehydration"],
    difficulty: "beginner"
  },

  // Evening Tips
  {
    id: "tip_evening_01",
    title: "Double Cleansing Method",
    category: "evening",
    content: "Start with an oil-based cleanser to dissolve makeup, sunscreen, and sebum. Follow with a water-based cleanser to remove remaining impurities. This two-step method ensures thorough but gentle cleansing without stripping the skin.",
    source: "Foundation of K-beauty routine",
    related_products: ["cleanser"],
    skin_concerns: ["acne", "clogged pores"],
    difficulty: "beginner"
  },
  {
    id: "tip_evening_02",
    title: "Sheet Mask After Exfoliation",
    category: "evening",
    content: "Use a sheet mask after chemical exfoliation (AHA/BHA) to soothe and hydrate your skin. The mask helps deliver concentrated ingredients while your skin is most receptive. Leave on for 15-20 minutes.",
    source: "K-beauty layering principle",
    related_ingredients: ["centella_asiatica", "aloe_vera"],
    skin_concerns: ["redness", "sensitivity"],
    difficulty: "intermediate"
  },
  {
    id: "tip_evening_03",
    title: "Retinol Sandwich Method",
    category: "evening",
    content: "Apply moisturizer before and after retinol to minimize irritation. This 'sandwich' technique allows you to use retinol effectively while protecting your skin barrier. Start with retinol 2-3 times per week.",
    source: "Korean dermatologist technique",
    related_ingredients: ["retinol", "ceramides"],
    skin_concerns: ["aging", "acne"],
    difficulty: "intermediate"
  },
  {
    id: "tip_evening_04",
    title: "Sleeping Pack Lock-In",
    category: "evening",
    content: "Apply a sleeping pack (overnight mask) as your final PM step. These occlusive products seal in all your skincare layers and work overnight. Wash off in the morning for plump, hydrated skin.",
    source: "K-beauty overnight treatment",
    related_ingredients: ["hyaluronic_acid", "squalane"],
    skin_concerns: ["dryness", "dullness"],
    difficulty: "beginner"
  },

  // Weekly Tips
  {
    id: "tip_weekly_01",
    title: "Clay Mask for T-Zone",
    category: "weekly",
    content: "Use a clay mask once or twice a week on your T-zone only if you have combination skin. This targeted approach addresses oiliness without over-drying cheeks. Leave on for 10-15 minutes maximum.",
    source: "Multi-masking technique",
    related_ingredients: ["kaolin"],
    skin_concerns: ["oiliness", "large pores"],
    difficulty: "beginner"
  },
  {
    id: "tip_weekly_02",
    title: "Gentle Exfoliation Schedule",
    category: "weekly",
    content: "Exfoliate 1-2 times per week with AHA (dry skin) or BHA (oily/acne skin). Over-exfoliation damages your skin barrier. Start slow and increase frequency only if your skin tolerates it well.",
    source: "Korean skincare principle",
    related_ingredients: ["glycolic_acid", "salicylic_acid"],
    skin_concerns: ["texture", "acne"],
    difficulty: "intermediate"
  },
  {
    id: "tip_weekly_03",
    title: "Face Massage with Oil",
    category: "weekly",
    content: "Once a week, spend 5-10 minutes massaging your face with a facial oil. Use upward and outward strokes to boost circulation and lymphatic drainage. This promotes the 'glass skin' glow Koreans are famous for.",
    source: "Traditional Korean beauty ritual",
    related_ingredients: ["squalane"],
    skin_concerns: ["dullness", "puffiness"],
    difficulty: "intermediate"
  },
  {
    id: "tip_weekly_04",
    title: "Lip Care Routine",
    category: "weekly",
    content: "Gently exfoliate lips with a sugar scrub once a week, then apply a thick layer of lip mask overnight. Korean lip masks often contain honey and ceramides for intense hydration.",
    source: "K-beauty lip care",
    related_ingredients: ["ceramides"],
    skin_concerns: ["dryness"],
    difficulty: "beginner"
  },

  // Seasonal Tips
  {
    id: "tip_seasonal_winter",
    title: "Winter Barrier Protection",
    category: "seasonal",
    content: "In winter, switch to richer moisturizers and add a facial oil. Reduce exfoliation frequency and increase hydrating layers. Consider using a humidifier to combat dry indoor air.",
    source: "Korean seasonal skincare",
    related_ingredients: ["ceramides", "squalane"],
    skin_concerns: ["dryness", "sensitivity"],
    difficulty: "beginner"
  },
  {
    id: "tip_seasonal_summer",
    title: "Summer Lightweight Layering",
    category: "seasonal",
    content: "In summer, switch to gel-based and water-based products. Use a lighter moisturizer and increase sunscreen application. Consider adding a sebum-control toner to your routine.",
    source: "Korean seasonal skincare",
    related_ingredients: ["niacinamide", "hyaluronic_acid"],
    skin_concerns: ["oiliness", "sun damage"],
    difficulty: "beginner"
  },
  {
    id: "tip_seasonal_spring",
    title: "Spring Allergy Season Care",
    category: "seasonal",
    content: "During spring, focus on soothing and barrier repair. Pollen and environmental changes can sensitize skin. Use centella-based products and avoid introducing new active ingredients.",
    source: "Korean seasonal skincare",
    related_ingredients: ["centella_asiatica", "aloe_vera"],
    skin_concerns: ["sensitivity", "redness"],
    difficulty: "beginner"
  },
  {
    id: "tip_seasonal_fall",
    title: "Fall Skin Recovery",
    category: "seasonal",
    content: "After summer sun exposure, focus on repairing and brightening. Introduce vitamin C serums and gentle exfoliation. Start transitioning to heavier moisturizers as the weather cools.",
    source: "Korean seasonal skincare",
    related_ingredients: ["vitamin_c", "niacinamide"],
    skin_concerns: ["hyperpigmentation", "dullness"],
    difficulty: "intermediate"
  },

  // Trending Tips
  {
    id: "tip_trending_01",
    title: "Skin Cycling Method",
    category: "trending",
    content: "Rotate your active ingredients throughout the week: Night 1 - Exfoliation, Night 2 - Retinol, Nights 3-4 - Recovery (hydration only). This gives your skin time to recover while maximizing benefits.",
    source: "Modern K-beauty adaptation",
    related_ingredients: ["retinol", "glycolic_acid"],
    skin_concerns: ["aging", "texture"],
    difficulty: "intermediate"
  },
  {
    id: "tip_trending_02",
    title: "Slugging Korean Style",
    category: "trending",
    content: "Apply a thin layer of occlusive product (like petroleum jelly or sleeping pack) over your entire routine. Koreans have practiced this for decades. Use 2-3 times per week for intense overnight hydration.",
    source: "Traditional Korean technique, recently viral",
    related_ingredients: ["squalane"],
    skin_concerns: ["dryness", "barrier damage"],
    difficulty: "beginner"
  },
  {
    id: "tip_trending_03",
    title: "Fermented Skincare Benefits",
    category: "trending",
    content: "Look for products with fermented ingredients like galactomyces, bifida ferment, or fermented rice water. Fermentation increases the bioavailability of nutrients and makes them easier for skin to absorb.",
    source: "K-beauty fermentation science",
    related_ingredients: ["galactomyces"],
    skin_concerns: ["dullness", "aging"],
    difficulty: "intermediate"
  },
  {
    id: "tip_trending_04",
    title: "Skin Barrier Focus",
    category: "trending",
    content: "The current K-beauty trend emphasizes skin barrier health over aggressive treatments. Focus on gentle, pH-balanced products and ceramide-rich moisturizers. A healthy barrier means better results from all your products.",
    source: "Current K-beauty philosophy",
    related_ingredients: ["ceramides", "squalane"],
    skin_concerns: ["sensitivity", "dryness"],
    difficulty: "beginner"
  }
];

export const trendingIngredients: TrendingIngredient[] = [
  {
    id: "trend_01",
    name: "Centella Asiatica",
    korean_name: "병풀",
    why_trending: "Known as 'cica', this ingredient has become a K-beauty staple for its powerful soothing and healing properties. It helps repair damaged skin barrier and calm inflammation.",
    best_for: ["sensitive", "acne-prone", "irritated skin"],
    how_to_use: "Look for serums or creams with 10%+ centella extract. Apply after toner.",
    season: "all"
  },
  {
    id: "trend_02",
    name: "Mugwort",
    korean_name: "쑥",
    why_trending: "A traditional Korean ingredient now popular in skincare for its anti-inflammatory and antioxidant properties. Gentle enough for sensitive skin while effectively calming redness.",
    best_for: ["sensitive", "redness-prone", "combination"],
    how_to_use: "Use as essence or sheet mask 2-3 times per week.",
    season: "spring"
  },
  {
    id: "trend_03",
    name: "Rice Water",
    korean_name: "쌀뜨물",
    why_trending: "Traditional Korean beauty secret now backed by science. Rich in vitamins B and E, rice water brightens skin, minimizes pores, and improves overall texture.",
    best_for: ["dull skin", "uneven texture", "all skin types"],
    how_to_use: "Use as toner or look for rice-based essences and creams.",
    season: "all"
  },
  {
    id: "trend_04",
    name: "Propolis",
    korean_name: "프로폴리스",
    why_trending: "Bee-derived ingredient that provides antibacterial benefits while deeply nourishing skin. Helps with acne, scarring, and provides a healthy glow.",
    best_for: ["acne-prone", "dull skin", "aging skin"],
    how_to_use: "Use as ampoule or serum after essence step.",
    season: "fall"
  },
  {
    id: "trend_05",
    name: "Galactomyces",
    korean_name: "갈락토미세스",
    why_trending: "Fermented yeast filtrate that brightens, hydrates, and improves skin texture. Made famous by SK-II and now available in many affordable K-beauty options.",
    best_for: ["dull skin", "uneven tone", "aging concerns"],
    how_to_use: "Apply as first treatment essence on clean skin.",
    season: "all"
  },
  {
    id: "trend_06",
    name: "Bifida Ferment Lysate",
    korean_name: "비피다",
    why_trending: "Probiotic-derived ingredient that strengthens skin barrier and boosts immunity. Helps skin recover from damage and environmental stress.",
    best_for: ["damaged barrier", "sensitive", "aging"],
    how_to_use: "Use in serums or essences as part of your daily routine.",
    season: "winter"
  },
  {
    id: "trend_07",
    name: "Green Tea",
    korean_name: "녹차",
    why_trending: "Rich in antioxidants (EGCG) that protect against environmental damage. Also has sebum-controlling properties making it perfect for oily skin.",
    best_for: ["oily skin", "acne-prone", "aging concerns"],
    how_to_use: "Use in cleansers, toners, or as mist throughout the day.",
    season: "summer"
  },
  {
    id: "trend_08",
    name: "Snail Mucin",
    korean_name: "달팽이 점액",
    why_trending: "K-beauty's most famous 'weird' ingredient. Contains growth factors that help with healing, hydration, and anti-aging. Non-irritating and suitable for most skin types.",
    best_for: ["dry skin", "scarring", "aging", "dehydrated"],
    how_to_use: "Apply as essence or serum. Layer under moisturizer.",
    season: "all"
  },
  {
    id: "trend_09",
    name: "Houttuynia Cordata",
    korean_name: "어성초",
    why_trending: "Powerful anti-inflammatory herb used in Korean medicine. Great for acne and troubled skin. Helps reduce redness and prevent breakouts.",
    best_for: ["acne-prone", "oily", "sensitive"],
    how_to_use: "Use in toners or spot treatments for troubled areas.",
    season: "summer"
  },
  {
    id: "trend_10",
    name: "Ginseng",
    korean_name: "인삼",
    why_trending: "Traditional Korean ingredient with powerful anti-aging properties. Boosts collagen production, firms skin, and provides a radiant complexion.",
    best_for: ["aging", "dull skin", "mature skin"],
    how_to_use: "Use in serums or essences, especially in PM routine.",
    season: "winter"
  }
];

export const featuredRoutines: FeaturedRoutine[] = [
  {
    id: "routine_glass_skin",
    name: "Glass Skin Routine",
    korean_name: "유리피부 루틴",
    description: "Achieve the famous Korean 'glass skin' look - skin so clear and luminous it looks like glass. This routine focuses on intense hydration layering to create a dewy, translucent complexion.",
    steps: [
      "Oil cleanser to remove makeup and sunscreen",
      "Gentle foam cleanser",
      "Exfoliating toner (2-3 times per week)",
      "Hydrating toner - pat in multiple thin layers (7-skin method)",
      "Essence for extra hydration",
      "Serum targeting specific concerns",
      "Sheet mask (optional, 2-3 times per week)",
      "Light moisturizer to seal everything in",
      "Facial oil for extra glow",
      "Sunscreen (AM only)"
    ],
    best_for: ["dull skin", "dry skin", "those wanting luminous glow"],
    difficulty: "intermediate",
    is_trending: true
  },
  {
    id: "routine_skip_care",
    name: "Skip-Care Routine",
    korean_name: "스킵케어",
    description: "The minimalist K-beauty approach. Focus on fewer, more effective products. Perfect for those who want results without a lengthy routine. Quality over quantity.",
    steps: [
      "Gentle cleanser (oil cleanser PM only if wearing makeup)",
      "Multi-functional toner-essence hybrid",
      "Treatment serum for your main concern",
      "Moisturizer with SPF (AM) or rich night cream (PM)"
    ],
    best_for: ["busy lifestyles", "beginners", "those with healthy skin"],
    difficulty: "beginner",
    is_trending: true
  },
  {
    id: "routine_7_skin",
    name: "7-Skin Method",
    korean_name: "7스킨법",
    description: "Layer your hydrating toner 7 times (or 3-7 depending on your needs) to achieve deep hydration. Each layer should be patted in before applying the next. Great for dehydrated skin.",
    steps: [
      "Cleanse thoroughly",
      "Apply first layer of hydrating toner with hands",
      "Pat until 80% absorbed",
      "Apply second layer",
      "Repeat 5 more times (total 7 layers)",
      "Follow with light essence if needed",
      "Seal with moisturizer"
    ],
    best_for: ["dehydrated skin", "dry climates", "winter skincare"],
    difficulty: "beginner",
    is_trending: false
  },
  {
    id: "routine_honey_glow",
    name: "Honey Glow Routine",
    korean_name: "꿀광 루틴",
    description: "Achieve the 'honey glow' - skin that looks naturally dewy and healthy, like it's lit from within. Different from glass skin, this focuses on warmth and natural radiance.",
    steps: [
      "Double cleanse",
      "Honey or propolis toner",
      "Vitamin C serum (AM) or fermented essence (PM)",
      "Propolis ampoule for glow",
      "Honey-based moisturizer",
      "Facial oil pressed into skin",
      "Dewy finish sunscreen (AM)"
    ],
    best_for: ["dull skin", "aging concerns", "those wanting natural glow"],
    difficulty: "intermediate",
    is_trending: true
  },
  {
    id: "routine_cica_rescue",
    name: "Cica Rescue Routine",
    korean_name: "시카 진정 루틴",
    description: "Emergency routine for irritated, stressed, or damaged skin. Focuses on centella asiatica (cica) to soothe, heal, and repair the skin barrier.",
    steps: [
      "Gentle, pH-balanced cleanser only",
      "Cica toner (no actives)",
      "Centella serum or ampoule",
      "Cica barrier cream",
      "Physical sunscreen (AM, avoid chemical filters)"
    ],
    best_for: ["irritated skin", "post-procedure", "barrier damage", "sensitivity"],
    difficulty: "beginner",
    is_trending: true
  }
];

// Helper function to get tips by category
export function getTipsByCategory(category?: string): KBeautyTip[] {
  if (!category || category === "all") {
    return kbeautyTips;
  }
  return kbeautyTips.filter(tip => tip.category === category);
}

// Helper function to get tips by skin concern
export function getTipsBySkinConcern(concern: string): KBeautyTip[] {
  return kbeautyTips.filter(tip =>
    tip.skin_concerns?.some(c => c.toLowerCase().includes(concern.toLowerCase()))
  );
}

// Helper function to get trending ingredients by season
export function getTrendingIngredientsBySeason(season?: string): TrendingIngredient[] {
  if (!season) {
    return trendingIngredients.filter(i => i.season === "all" || !i.season);
  }
  return trendingIngredients.filter(i =>
    i.season === season || i.season === "all" || !i.season
  );
}

// Helper function to get featured routine by name
export function getFeaturedRoutineByName(name: string): FeaturedRoutine | undefined {
  const lowerName = name.toLowerCase();
  return featuredRoutines.find(r =>
    r.name.toLowerCase().includes(lowerName) ||
    r.korean_name?.toLowerCase().includes(lowerName) ||
    r.id.toLowerCase().includes(lowerName.replace(/\s+/g, '_'))
  );
}
