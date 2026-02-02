export interface RoutineStep {
  order: number;
  step_name: string;
  description: string;
  is_optional: boolean;
  recommended_ingredients: string[];
  product_types: string[];
  tips: string;
  wait_time?: string;
}

export interface Routine {
  id: string;
  skin_type: string;
  routine_type: "morning" | "evening";
  level: "basic" | "intermediate" | "advanced";
  steps: RoutineStep[];
}

export const routines: Routine[] = [
  // DRY SKIN ROUTINES
  {
    id: "dry-morning-basic",
    skin_type: "dry",
    routine_type: "morning",
    level: "basic",
    steps: [
      {
        order: 1,
        step_name: "Cleanser",
        description: "Use a gentle, hydrating cleanser or just rinse with water",
        is_optional: false,
        recommended_ingredients: ["ceramides", "hyaluronic_acid"],
        product_types: ["cleanser"],
        tips: "If your skin feels okay, you can skip cleansing and just rinse with lukewarm water in the morning."
      },
      {
        order: 2,
        step_name: "Toner",
        description: "Apply a hydrating toner to damp skin",
        is_optional: false,
        recommended_ingredients: ["hyaluronic_acid", "glycerin"],
        product_types: ["toner"],
        tips: "Pat the toner into skin rather than wiping. You can do multiple layers (7-skin method) for extra hydration."
      },
      {
        order: 3,
        step_name: "Serum/Essence",
        description: "Apply a hydrating serum or essence",
        is_optional: true,
        recommended_ingredients: ["hyaluronic_acid", "snail_mucin", "ceramides"],
        product_types: ["serum", "essence"],
        tips: "Layer from thinnest to thickest consistency."
      },
      {
        order: 4,
        step_name: "Moisturizer",
        description: "Seal in hydration with a rich moisturizer",
        is_optional: false,
        recommended_ingredients: ["ceramides", "squalane", "shea_butter"],
        product_types: ["moisturizer"],
        tips: "Don't be afraid to use a thick cream - dry skin needs it!"
      },
      {
        order: 5,
        step_name: "Sunscreen",
        description: "Apply SPF 30+ sunscreen as the final step",
        is_optional: false,
        recommended_ingredients: [],
        product_types: ["sunscreen"],
        tips: "Look for hydrating sunscreens. Apply generously and reapply every 2 hours if outdoors."
      }
    ]
  },
  {
    id: "dry-evening-basic",
    skin_type: "dry",
    routine_type: "evening",
    level: "basic",
    steps: [
      {
        order: 1,
        step_name: "Oil Cleanser / Cleansing Balm",
        description: "Remove sunscreen and makeup with an oil-based cleanser",
        is_optional: false,
        recommended_ingredients: ["jojoba_oil", "squalane"],
        product_types: ["cleanser"],
        tips: "Massage onto dry skin for 1-2 minutes to dissolve everything."
      },
      {
        order: 2,
        step_name: "Water Cleanser",
        description: "Follow with a gentle water-based cleanser",
        is_optional: false,
        recommended_ingredients: ["ceramides", "hyaluronic_acid"],
        product_types: ["cleanser"],
        tips: "This is the double cleanse method - essential for clean skin!"
      },
      {
        order: 3,
        step_name: "Toner",
        description: "Apply hydrating toner to prep skin",
        is_optional: false,
        recommended_ingredients: ["hyaluronic_acid", "centella_asiatica"],
        product_types: ["toner"],
        tips: "Apply to damp skin for better absorption."
      },
      {
        order: 4,
        step_name: "Serum/Treatment",
        description: "Apply targeted treatments",
        is_optional: true,
        recommended_ingredients: ["retinol", "peptides", "niacinamide"],
        product_types: ["serum"],
        tips: "If using retinol, start 1-2x per week and build up slowly.",
        wait_time: "Wait 1-2 minutes after retinol before next step"
      },
      {
        order: 5,
        step_name: "Moisturizer",
        description: "Apply a rich night cream",
        is_optional: false,
        recommended_ingredients: ["ceramides", "squalane", "peptides"],
        product_types: ["moisturizer"],
        tips: "Night is when skin repairs - use a richer cream than your morning one."
      },
      {
        order: 6,
        step_name: "Sleeping Mask",
        description: "Lock everything in with a sleeping mask (2-3x per week)",
        is_optional: true,
        recommended_ingredients: ["hyaluronic_acid", "honey"],
        product_types: ["mask"],
        tips: "Use this on nights when you need extra hydration boost."
      }
    ]
  },

  // OILY SKIN ROUTINES
  {
    id: "oily-morning-basic",
    skin_type: "oily",
    routine_type: "morning",
    level: "basic",
    steps: [
      {
        order: 1,
        step_name: "Cleanser",
        description: "Use a gentle, low-pH gel or foam cleanser",
        is_optional: false,
        recommended_ingredients: ["tea_tree", "salicylic_acid"],
        product_types: ["cleanser"],
        tips: "Cleansing is important for oily skin to remove overnight sebum buildup."
      },
      {
        order: 2,
        step_name: "Toner",
        description: "Use a lightweight, pore-refining toner",
        is_optional: false,
        recommended_ingredients: ["niacinamide", "bha", "witch_hazel"],
        product_types: ["toner"],
        tips: "Avoid alcohol-heavy toners that can trigger more oil production."
      },
      {
        order: 3,
        step_name: "Serum",
        description: "Apply a lightweight, oil-controlling serum",
        is_optional: true,
        recommended_ingredients: ["niacinamide", "hyaluronic_acid"],
        product_types: ["serum"],
        tips: "Niacinamide is your best friend - it controls oil without drying."
      },
      {
        order: 4,
        step_name: "Moisturizer",
        description: "Use a lightweight gel or gel-cream moisturizer",
        is_optional: false,
        recommended_ingredients: ["hyaluronic_acid", "niacinamide", "squalane"],
        product_types: ["moisturizer"],
        tips: "Don't skip moisturizer! Dehydrated oily skin produces MORE oil."
      },
      {
        order: 5,
        step_name: "Sunscreen",
        description: "Apply a lightweight, non-greasy sunscreen",
        is_optional: false,
        recommended_ingredients: [],
        product_types: ["sunscreen"],
        tips: "Look for gel or water-based sunscreens. Avoid heavy, creamy formulas."
      }
    ]
  },
  {
    id: "oily-evening-basic",
    skin_type: "oily",
    routine_type: "evening",
    level: "basic",
    steps: [
      {
        order: 1,
        step_name: "Oil Cleanser",
        description: "Remove sunscreen and excess sebum with an oil cleanser",
        is_optional: false,
        recommended_ingredients: ["jojoba_oil"],
        product_types: ["cleanser"],
        tips: "Yes, even oily skin benefits from oil cleansing! Oil dissolves oil."
      },
      {
        order: 2,
        step_name: "Water Cleanser",
        description: "Follow with a gel or foam cleanser",
        is_optional: false,
        recommended_ingredients: ["tea_tree", "salicylic_acid"],
        product_types: ["cleanser"],
        tips: "Don't over-cleanse - 30-60 seconds is enough."
      },
      {
        order: 3,
        step_name: "Exfoliating Toner (2-3x/week)",
        description: "Use a BHA toner to deep clean pores",
        is_optional: true,
        recommended_ingredients: ["salicylic_acid", "glycolic_acid"],
        product_types: ["toner"],
        tips: "Don't use every night. Start with 2x per week.",
        wait_time: "Wait 10-15 minutes for acids to work before next step"
      },
      {
        order: 4,
        step_name: "Toner",
        description: "Apply a hydrating toner (on non-exfoliating nights)",
        is_optional: false,
        recommended_ingredients: ["hyaluronic_acid", "niacinamide"],
        product_types: ["toner"],
        tips: "Hydration is still important for oily skin!"
      },
      {
        order: 5,
        step_name: "Serum",
        description: "Apply targeted treatments",
        is_optional: true,
        recommended_ingredients: ["niacinamide", "retinol", "salicylic_acid"],
        product_types: ["serum"],
        tips: "Don't mix too many actives. Keep it simple."
      },
      {
        order: 6,
        step_name: "Moisturizer",
        description: "Use a lightweight gel moisturizer",
        is_optional: false,
        recommended_ingredients: ["hyaluronic_acid", "niacinamide"],
        product_types: ["moisturizer"],
        tips: "Even oily skin needs moisture at night for repair."
      }
    ]
  },

  // SENSITIVE SKIN ROUTINES
  {
    id: "sensitive-morning-basic",
    skin_type: "sensitive",
    routine_type: "morning",
    level: "basic",
    steps: [
      {
        order: 1,
        step_name: "Cleanser",
        description: "Use a very gentle, fragrance-free cleanser",
        is_optional: true,
        recommended_ingredients: ["centella_asiatica", "ceramides"],
        product_types: ["cleanser"],
        tips: "If skin is reactive, just rinse with cool water in the morning."
      },
      {
        order: 2,
        step_name: "Toner",
        description: "Apply a soothing, alcohol-free toner",
        is_optional: false,
        recommended_ingredients: ["centella_asiatica", "aloe_vera", "hyaluronic_acid"],
        product_types: ["toner"],
        tips: "Avoid any toner with fragrance, alcohol, or essential oils."
      },
      {
        order: 3,
        step_name: "Serum",
        description: "Apply a calming serum",
        is_optional: true,
        recommended_ingredients: ["centella_asiatica", "panthenol", "allantoin"],
        product_types: ["serum"],
        tips: "Stick to soothing ingredients. Avoid actives until skin is calm."
      },
      {
        order: 4,
        step_name: "Moisturizer",
        description: "Use a gentle, barrier-repairing moisturizer",
        is_optional: false,
        recommended_ingredients: ["ceramides", "centella_asiatica", "squalane"],
        product_types: ["moisturizer"],
        tips: "Focus on strengthening your skin barrier before adding any actives."
      },
      {
        order: 5,
        step_name: "Sunscreen",
        description: "Apply a mineral/physical sunscreen",
        is_optional: false,
        recommended_ingredients: ["zinc_oxide", "titanium_dioxide"],
        product_types: ["sunscreen"],
        tips: "Mineral sunscreens are gentler than chemical ones for sensitive skin."
      }
    ]
  },
  {
    id: "sensitive-evening-basic",
    skin_type: "sensitive",
    routine_type: "evening",
    level: "basic",
    steps: [
      {
        order: 1,
        step_name: "Cleansing Balm/Oil",
        description: "Gently remove sunscreen with a mild cleansing balm",
        is_optional: false,
        recommended_ingredients: ["jojoba_oil", "squalane"],
        product_types: ["cleanser"],
        tips: "Be very gentle - no tugging or rubbing."
      },
      {
        order: 2,
        step_name: "Water Cleanser",
        description: "Follow with a gentle, creamy cleanser",
        is_optional: false,
        recommended_ingredients: ["ceramides", "centella_asiatica"],
        product_types: ["cleanser"],
        tips: "Use lukewarm water. Hot water can irritate sensitive skin."
      },
      {
        order: 3,
        step_name: "Toner",
        description: "Apply a soothing toner",
        is_optional: false,
        recommended_ingredients: ["centella_asiatica", "aloe_vera"],
        product_types: ["toner"],
        tips: "Pat gently - don't rub."
      },
      {
        order: 4,
        step_name: "Serum",
        description: "Apply a calming, repairing serum",
        is_optional: true,
        recommended_ingredients: ["centella_asiatica", "niacinamide", "panthenol"],
        product_types: ["serum"],
        tips: "Keep your routine minimal when skin is reactive."
      },
      {
        order: 5,
        step_name: "Moisturizer",
        description: "Use a rich, barrier-repairing cream",
        is_optional: false,
        recommended_ingredients: ["ceramides", "cholesterol", "fatty_acids"],
        product_types: ["moisturizer"],
        tips: "A good ceramide cream is essential for sensitive skin."
      }
    ]
  },

  // COMBINATION SKIN ROUTINES
  {
    id: "combination-morning-basic",
    skin_type: "combination",
    routine_type: "morning",
    level: "basic",
    steps: [
      {
        order: 1,
        step_name: "Cleanser",
        description: "Use a balanced, gentle gel cleanser",
        is_optional: false,
        recommended_ingredients: ["hyaluronic_acid"],
        product_types: ["cleanser"],
        tips: "Find a cleanser that's not too drying or too moisturizing."
      },
      {
        order: 2,
        step_name: "Toner",
        description: "Apply a balancing toner",
        is_optional: false,
        recommended_ingredients: ["niacinamide", "hyaluronic_acid"],
        product_types: ["toner"],
        tips: "Niacinamide helps balance oil production in T-zone while hydrating dry areas."
      },
      {
        order: 3,
        step_name: "Serum",
        description: "Apply a lightweight hydrating serum",
        is_optional: true,
        recommended_ingredients: ["hyaluronic_acid", "niacinamide"],
        product_types: ["serum"],
        tips: "You can apply more serum to dry areas, less to oily T-zone."
      },
      {
        order: 4,
        step_name: "Moisturizer",
        description: "Use a lightweight lotion or gel-cream",
        is_optional: false,
        recommended_ingredients: ["hyaluronic_acid", "squalane"],
        product_types: ["moisturizer"],
        tips: "You can use a lighter moisturizer on T-zone, richer one on dry cheeks."
      },
      {
        order: 5,
        step_name: "Sunscreen",
        description: "Apply a non-greasy sunscreen",
        is_optional: false,
        recommended_ingredients: [],
        product_types: ["sunscreen"],
        tips: "Look for mattifying sunscreens that won't make T-zone oily."
      }
    ]
  },
  {
    id: "combination-evening-basic",
    skin_type: "combination",
    routine_type: "evening",
    level: "basic",
    steps: [
      {
        order: 1,
        step_name: "Oil Cleanser",
        description: "Remove sunscreen and makeup",
        is_optional: false,
        recommended_ingredients: [],
        product_types: ["cleanser"],
        tips: "Oil cleansing works well for combo skin - it balances sebum."
      },
      {
        order: 2,
        step_name: "Water Cleanser",
        description: "Follow with a gentle gel cleanser",
        is_optional: false,
        recommended_ingredients: ["hyaluronic_acid"],
        product_types: ["cleanser"],
        tips: "Focus on T-zone where pores are larger."
      },
      {
        order: 3,
        step_name: "Exfoliating Toner (2x/week)",
        description: "Use a gentle AHA/BHA toner on oily areas",
        is_optional: true,
        recommended_ingredients: ["salicylic_acid", "lactic_acid"],
        product_types: ["toner"],
        tips: "Apply only to T-zone and areas with congestion. Skip dry cheeks."
      },
      {
        order: 4,
        step_name: "Toner",
        description: "Apply a hydrating toner",
        is_optional: false,
        recommended_ingredients: ["hyaluronic_acid", "niacinamide"],
        product_types: ["toner"],
        tips: "Extra layers on dry areas if needed."
      },
      {
        order: 5,
        step_name: "Serum",
        description: "Apply targeted treatments",
        is_optional: true,
        recommended_ingredients: ["niacinamide", "retinol"],
        product_types: ["serum"],
        tips: "You can use different products for different zones."
      },
      {
        order: 6,
        step_name: "Moisturizer",
        description: "Apply moisturizer - can use different textures for different zones",
        is_optional: false,
        recommended_ingredients: ["hyaluronic_acid", "ceramides"],
        product_types: ["moisturizer"],
        tips: "Multi-masking concept works for moisturizer too!"
      }
    ]
  },

  // NORMAL SKIN ROUTINES
  {
    id: "normal-morning-basic",
    skin_type: "normal",
    routine_type: "morning",
    level: "basic",
    steps: [
      {
        order: 1,
        step_name: "Cleanser",
        description: "Use any gentle cleanser you like",
        is_optional: true,
        recommended_ingredients: [],
        product_types: ["cleanser"],
        tips: "You can skip cleansing in AM and just rinse with water."
      },
      {
        order: 2,
        step_name: "Toner",
        description: "Apply a hydrating toner",
        is_optional: false,
        recommended_ingredients: ["hyaluronic_acid"],
        product_types: ["toner"],
        tips: "Normal skin is versatile - you can use almost any toner!"
      },
      {
        order: 3,
        step_name: "Serum",
        description: "Apply a serum for your specific goals",
        is_optional: true,
        recommended_ingredients: ["vitamin_c", "niacinamide", "hyaluronic_acid"],
        product_types: ["serum"],
        tips: "Vitamin C in the morning provides antioxidant protection."
      },
      {
        order: 4,
        step_name: "Moisturizer",
        description: "Apply a lotion or light cream",
        is_optional: false,
        recommended_ingredients: [],
        product_types: ["moisturizer"],
        tips: "Normal skin can use most moisturizer textures comfortably."
      },
      {
        order: 5,
        step_name: "Sunscreen",
        description: "Apply your favorite sunscreen",
        is_optional: false,
        recommended_ingredients: [],
        product_types: ["sunscreen"],
        tips: "Lucky you - most sunscreen formulas work well for normal skin!"
      }
    ]
  },
  {
    id: "normal-evening-basic",
    skin_type: "normal",
    routine_type: "evening",
    level: "basic",
    steps: [
      {
        order: 1,
        step_name: "Oil Cleanser",
        description: "Remove sunscreen and makeup",
        is_optional: false,
        recommended_ingredients: [],
        product_types: ["cleanser"],
        tips: "Double cleansing keeps skin balanced and clear."
      },
      {
        order: 2,
        step_name: "Water Cleanser",
        description: "Follow with a gentle cleanser",
        is_optional: false,
        recommended_ingredients: [],
        product_types: ["cleanser"],
        tips: "Any gentle cleanser works for normal skin."
      },
      {
        order: 3,
        step_name: "Toner",
        description: "Apply a toner",
        is_optional: false,
        recommended_ingredients: ["hyaluronic_acid", "niacinamide"],
        product_types: ["toner"],
        tips: "You can experiment with different toners."
      },
      {
        order: 4,
        step_name: "Serum",
        description: "Apply targeted treatments based on your goals",
        is_optional: true,
        recommended_ingredients: ["retinol", "niacinamide", "peptides"],
        product_types: ["serum"],
        tips: "Normal skin can tolerate most actives well. Great time to experiment!"
      },
      {
        order: 5,
        step_name: "Moisturizer",
        description: "Apply a moisturizer",
        is_optional: false,
        recommended_ingredients: [],
        product_types: ["moisturizer"],
        tips: "Use a slightly richer cream at night for repair."
      }
    ]
  }
];

export function getRoutine(
  skinType: string,
  routineType: "morning" | "evening",
  level: string = "basic"
): Routine | null {
  return routines.find(r =>
    r.skin_type === skinType &&
    r.routine_type === routineType &&
    r.level === level
  ) ?? null;
}

export function getRoutinesForSkinType(skinType: string): Routine[] {
  return routines.filter(r => r.skin_type === skinType);
}
