export interface Ingredient {
  id: string;
  name: string;
  also_known_as: string[];
  category: string;
  benefits: string[];
  best_for: string[];
  how_to_use: string;
  concentration: string;
  precautions: string[];
  pairs_well_with: string[];
  avoid_mixing_with: string[];
  fun_fact?: string;
}

export const ingredients: Ingredient[] = [
  // Hydrating
  {
    id: "hyaluronic_acid",
    name: "Hyaluronic Acid",
    also_known_as: ["HA", "Sodium Hyaluronate"],
    category: "hydrating",
    benefits: ["Intense hydration", "Plumps skin", "Reduces fine lines", "Suitable for all skin types"],
    best_for: ["dry", "normal", "combination", "sensitive"],
    how_to_use: "Apply to damp skin, then layer moisturizer on top to seal in hydration.",
    concentration: "0.1-2% is effective",
    precautions: ["Apply to damp skin for best results", "May feel sticky in very humid climates"],
    pairs_well_with: ["niacinamide", "vitamin_c", "ceramides"],
    avoid_mixing_with: [],
    fun_fact: "HA can hold up to 1000 times its weight in water!"
  },
  {
    id: "ceramides",
    name: "Ceramides",
    also_known_as: ["Ceramide NP", "Ceramide AP", "Ceramide EOP"],
    category: "hydrating",
    benefits: ["Strengthens skin barrier", "Locks in moisture", "Soothes irritation", "Prevents water loss"],
    best_for: ["dry", "sensitive", "normal"],
    how_to_use: "Use in moisturizers or serums, especially in PM routine.",
    concentration: "0.5-1% is typical in formulations",
    precautions: ["Very gentle, rarely causes irritation"],
    pairs_well_with: ["hyaluronic_acid", "niacinamide", "cholesterol"],
    avoid_mixing_with: [],
    fun_fact: "Ceramides make up about 50% of your skin's barrier!"
  },
  {
    id: "squalane",
    name: "Squalane",
    also_known_as: ["Squalene (unstable form)"],
    category: "hydrating",
    benefits: ["Lightweight moisture", "Non-comedogenic", "Antioxidant", "Mimics skin's natural oils"],
    best_for: ["oily", "combination", "dry", "sensitive"],
    how_to_use: "Apply as last step of routine or mix with moisturizer.",
    concentration: "Can be used at 100%",
    precautions: ["Very well tolerated by most skin types"],
    pairs_well_with: ["retinol", "vitamin_c", "niacinamide"],
    avoid_mixing_with: [],
    fun_fact: "Squalane is derived from olives or sugarcane and is identical to what your skin naturally produces!"
  },

  // Brightening
  {
    id: "niacinamide",
    name: "Niacinamide",
    also_known_as: ["Vitamin B3", "Nicotinamide"],
    category: "brightening",
    benefits: ["Brightens skin tone", "Minimizes pores", "Controls oil", "Strengthens barrier"],
    best_for: ["oily", "combination", "normal"],
    how_to_use: "Apply after toner, before heavier creams. Can use AM and PM.",
    concentration: "2-10% is most effective",
    precautions: ["May cause flushing initially", "Start with lower concentration if sensitive"],
    pairs_well_with: ["hyaluronic_acid", "retinol", "salicylic_acid"],
    avoid_mixing_with: ["vitamin_c"],
    fun_fact: "Niacinamide is one of the most researched skincare ingredients with proven results!"
  },
  {
    id: "vitamin_c",
    name: "Vitamin C",
    also_known_as: ["L-Ascorbic Acid", "Ascorbyl Glucoside", "Sodium Ascorbyl Phosphate"],
    category: "brightening",
    benefits: ["Brightens dark spots", "Antioxidant protection", "Boosts collagen", "Evens skin tone"],
    best_for: ["normal", "dry", "combination"],
    how_to_use: "Apply in AM before sunscreen for antioxidant protection.",
    concentration: "10-20% for L-Ascorbic Acid",
    precautions: ["Can be unstable", "May cause tingling", "Store away from light"],
    pairs_well_with: ["vitamin_e", "ferulic_acid", "hyaluronic_acid"],
    avoid_mixing_with: ["niacinamide", "retinol", "aha", "bha"],
    fun_fact: "Vitamin C is most effective when combined with Vitamin E and Ferulic Acid!"
  },
  {
    id: "arbutin",
    name: "Arbutin",
    also_known_as: ["Alpha-Arbutin", "Beta-Arbutin"],
    category: "brightening",
    benefits: ["Fades dark spots", "Gentle brightening", "Even skin tone", "Safe for sensitive skin"],
    best_for: ["all skin types", "sensitive"],
    how_to_use: "Apply to clean skin before moisturizer, AM or PM.",
    concentration: "1-2% is effective",
    precautions: ["Very gentle", "Alpha-arbutin is more stable and effective"],
    pairs_well_with: ["niacinamide", "vitamin_c", "hyaluronic_acid"],
    avoid_mixing_with: [],
    fun_fact: "Arbutin is derived from bearberry plant and is a gentler alternative to hydroquinone!"
  },

  // Anti-aging
  {
    id: "retinol",
    name: "Retinol",
    also_known_as: ["Vitamin A", "Retinoids", "Retinyl Palmitate"],
    category: "anti_aging",
    benefits: ["Reduces wrinkles", "Increases cell turnover", "Fades dark spots", "Improves texture"],
    best_for: ["normal", "oily", "combination"],
    how_to_use: "Use PM only. Start 1-2x/week, gradually increase. Always use sunscreen.",
    concentration: "0.25-1% for beginners to advanced",
    precautions: ["Causes dryness/peeling initially", "Increases sun sensitivity", "Not for pregnancy"],
    pairs_well_with: ["hyaluronic_acid", "niacinamide", "ceramides"],
    avoid_mixing_with: ["vitamin_c", "aha", "bha", "benzoyl_peroxide"],
    fun_fact: "Retinol is the gold standard anti-aging ingredient backed by decades of research!"
  },
  {
    id: "peptides",
    name: "Peptides",
    also_known_as: ["Copper Peptides", "Matrixyl", "Argireline"],
    category: "anti_aging",
    benefits: ["Boosts collagen", "Firms skin", "Reduces wrinkles", "Improves elasticity"],
    best_for: ["all skin types"],
    how_to_use: "Apply after water-based serums, before moisturizer.",
    concentration: "Varies by peptide type",
    precautions: ["Generally very well tolerated"],
    pairs_well_with: ["hyaluronic_acid", "niacinamide", "vitamin_c"],
    avoid_mixing_with: ["aha", "bha"],
    fun_fact: "Peptides are like messengers that tell your skin to produce more collagen!"
  },

  // Acne-fighting
  {
    id: "salicylic_acid",
    name: "Salicylic Acid",
    also_known_as: ["BHA", "Beta Hydroxy Acid"],
    category: "acne_fighting",
    benefits: ["Unclogs pores", "Reduces blackheads", "Controls oil", "Anti-inflammatory"],
    best_for: ["oily", "combination", "acne-prone"],
    how_to_use: "Use 2-3x/week, can increase to daily. Apply after cleansing.",
    concentration: "0.5-2%",
    precautions: ["May cause dryness", "Use sunscreen", "Start slowly"],
    pairs_well_with: ["niacinamide", "hyaluronic_acid"],
    avoid_mixing_with: ["retinol", "vitamin_c", "other acids"],
    fun_fact: "BHA is oil-soluble, so it can penetrate into pores unlike AHAs!"
  },
  {
    id: "tea_tree",
    name: "Tea Tree Oil",
    also_known_as: ["Melaleuca Alternifolia"],
    category: "acne_fighting",
    benefits: ["Antibacterial", "Reduces acne", "Soothes inflammation", "Natural antiseptic"],
    best_for: ["oily", "acne-prone"],
    how_to_use: "Use diluted (1-5%) or in formulated products. Spot treatment or all-over.",
    concentration: "1-5% in formulations",
    precautions: ["Can be irritating if undiluted", "Patch test first"],
    pairs_well_with: ["niacinamide", "centella_asiatica"],
    avoid_mixing_with: ["retinol", "strong acids"],
    fun_fact: "Tea tree oil has been used for centuries by Australian Aboriginal people!"
  },

  // Soothing
  {
    id: "centella_asiatica",
    name: "Centella Asiatica",
    also_known_as: ["Cica", "Tiger Grass", "Gotu Kola", "Madecassoside"],
    category: "soothing",
    benefits: ["Calms irritation", "Speeds healing", "Strengthens barrier", "Anti-inflammatory"],
    best_for: ["sensitive", "dry", "all skin types"],
    how_to_use: "Can be used AM and PM. Layer under moisturizer.",
    concentration: "Effective at various concentrations",
    precautions: ["Very gentle, rarely causes issues"],
    pairs_well_with: ["hyaluronic_acid", "niacinamide", "ceramides"],
    avoid_mixing_with: [],
    fun_fact: "Called 'tiger grass' because tigers roll in it to heal their wounds!"
  },
  {
    id: "aloe_vera",
    name: "Aloe Vera",
    also_known_as: ["Aloe Barbadensis"],
    category: "soothing",
    benefits: ["Soothes sunburn", "Hydrates", "Anti-inflammatory", "Cooling effect"],
    best_for: ["all skin types", "sensitive", "sunburned"],
    how_to_use: "Apply generously to irritated or sunburned skin.",
    concentration: "Higher percentages for more soothing effect",
    precautions: ["Some people may be allergic - patch test"],
    pairs_well_with: ["hyaluronic_acid", "centella_asiatica"],
    avoid_mixing_with: [],
    fun_fact: "Aloe vera has been used for skin care for over 6,000 years!"
  },

  // Exfoliating
  {
    id: "glycolic_acid",
    name: "Glycolic Acid",
    also_known_as: ["AHA", "Alpha Hydroxy Acid"],
    category: "exfoliating",
    benefits: ["Exfoliates dead skin", "Brightens", "Smooths texture", "Reduces fine lines"],
    best_for: ["normal", "dry", "sun-damaged"],
    how_to_use: "Use 2-3x/week at night. Always use sunscreen next day.",
    concentration: "5-10% for home use",
    precautions: ["Increases sun sensitivity", "Start with lower %", "May cause tingling"],
    pairs_well_with: ["hyaluronic_acid", "niacinamide"],
    avoid_mixing_with: ["retinol", "vitamin_c", "other acids"],
    fun_fact: "Glycolic acid has the smallest molecule size of all AHAs, so it penetrates deepest!"
  },
  {
    id: "lactic_acid",
    name: "Lactic Acid",
    also_known_as: ["AHA"],
    category: "exfoliating",
    benefits: ["Gentle exfoliation", "Hydrating", "Brightening", "Good for beginners"],
    best_for: ["dry", "sensitive", "normal"],
    how_to_use: "Use 2-3x/week at night. Gentler than glycolic acid.",
    concentration: "5-10% for home use",
    precautions: ["Milder than glycolic", "Still use sunscreen"],
    pairs_well_with: ["hyaluronic_acid", "niacinamide"],
    avoid_mixing_with: ["retinol", "vitamin_c", "other acids"],
    fun_fact: "Lactic acid is derived from milk - Cleopatra bathed in milk for smooth skin!"
  }
];

export function getIngredientInfo(id: string): Ingredient | null {
  const normalized = id.toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_");
  return ingredients.find(i =>
    i.id === normalized ||
    i.name.toLowerCase() === id.toLowerCase() ||
    i.also_known_as.some(aka => aka.toLowerCase() === id.toLowerCase())
  ) ?? null;
}

export function getIngredientsByCategory(category: string): Ingredient[] {
  return ingredients.filter(i => i.category === category);
}

export function getIngredientsForSkinType(skinType: string): Ingredient[] {
  return ingredients.filter(i => i.best_for.includes(skinType) || i.best_for.includes("all skin types"));
}
