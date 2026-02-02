export interface Product {
  id: string;
  name: string;
  brand: string;
  product_type: string;
  key_ingredients: string[];
  skin_types: string[];
  concerns: string[];
  price_range: "budget" | "mid" | "premium";
  price_usd?: number;
  size_ml?: number;
  rating?: number;
  description: string;
  external_url?: string;
}

export const products: Product[] = [
  // Cleansers
  {
    id: "cosrx-low-ph-cleanser",
    name: "Low pH Good Morning Gel Cleanser",
    brand: "COSRX",
    product_type: "cleanser",
    key_ingredients: ["tea_tree", "bha"],
    skin_types: ["oily", "combination", "acne-prone"],
    concerns: ["acne", "pores"],
    price_range: "budget",
    price_usd: 12,
    size_ml: 150,
    rating: 4.5,
    description: "Gentle, low pH gel cleanser with tea tree oil. Perfect for oily and acne-prone skin without stripping moisture."
  },
  {
    id: "beauty-of-joseon-cleansing-balm",
    name: "Radiance Cleansing Balm",
    brand: "Beauty of Joseon",
    product_type: "cleanser",
    key_ingredients: ["rice_bran", "soybean"],
    skin_types: ["dry", "normal", "sensitive"],
    concerns: ["dryness", "dullness"],
    price_range: "budget",
    price_usd: 16,
    size_ml: 100,
    rating: 4.7,
    description: "Nourishing cleansing balm that melts away makeup and sunscreen while leaving skin soft and hydrated."
  },
  {
    id: "round-lab-dokdo-cleanser",
    name: "1025 Dokdo Cleanser",
    brand: "Round Lab",
    product_type: "cleanser",
    key_ingredients: ["deep_sea_water"],
    skin_types: ["all", "sensitive"],
    concerns: ["hydration", "sensitivity"],
    price_range: "budget",
    price_usd: 14,
    size_ml: 150,
    rating: 4.6,
    description: "Ultra-gentle, low pH cleanser with mineral-rich deep sea water from Ulleungdo island."
  },

  // Toners
  {
    id: "klairs-supple-toner",
    name: "Supple Preparation Unscented Toner",
    brand: "Dear, Klairs",
    product_type: "toner",
    key_ingredients: ["hyaluronic_acid", "centella_asiatica"],
    skin_types: ["dry", "sensitive", "normal"],
    concerns: ["hydration", "sensitivity"],
    price_range: "mid",
    price_usd: 22,
    size_ml: 180,
    rating: 4.6,
    description: "Fragrance-free hydrating toner that preps skin for the next steps while soothing sensitive skin."
  },
  {
    id: "cosrx-aha-bha-toner",
    name: "AHA/BHA Clarifying Treatment Toner",
    brand: "COSRX",
    product_type: "toner",
    key_ingredients: ["glycolic_acid", "salicylic_acid"],
    skin_types: ["oily", "combination"],
    concerns: ["acne", "pores", "texture"],
    price_range: "budget",
    price_usd: 15,
    size_ml: 150,
    rating: 4.3,
    description: "Gentle exfoliating toner with natural AHA and BHA to prevent breakouts and minimize pores."
  },
  {
    id: "isntree-hyaluronic-toner",
    name: "Hyaluronic Acid Toner",
    brand: "Isntree",
    product_type: "toner",
    key_ingredients: ["hyaluronic_acid"],
    skin_types: ["dry", "normal", "combination"],
    concerns: ["hydration", "fine lines"],
    price_range: "mid",
    price_usd: 20,
    size_ml: 200,
    rating: 4.7,
    description: "Intensely hydrating toner with 50% hyaluronic acid complex for plump, bouncy skin."
  },

  // Essences & Serums
  {
    id: "cosrx-snail-mucin",
    name: "Advanced Snail 96 Mucin Power Essence",
    brand: "COSRX",
    product_type: "essence",
    key_ingredients: ["snail_mucin", "hyaluronic_acid"],
    skin_types: ["dry", "normal", "sensitive"],
    concerns: ["hydration", "healing", "anti-aging"],
    price_range: "budget",
    price_usd: 25,
    size_ml: 100,
    rating: 4.7,
    description: "Cult-favorite essence with 96% snail mucin to hydrate, repair, and give that glass skin glow."
  },
  {
    id: "beauty-of-joseon-glow-serum",
    name: "Glow Serum: Propolis + Niacinamide",
    brand: "Beauty of Joseon",
    product_type: "serum",
    key_ingredients: ["niacinamide", "propolis"],
    skin_types: ["oily", "combination", "normal"],
    concerns: ["brightening", "pores", "acne"],
    price_range: "budget",
    price_usd: 17,
    size_ml: 30,
    rating: 4.6,
    description: "Lightweight serum combining niacinamide and propolis for brighter, clearer skin."
  },
  {
    id: "purito-centella-serum",
    name: "Centella Unscented Serum",
    brand: "Purito",
    product_type: "serum",
    key_ingredients: ["centella_asiatica", "niacinamide"],
    skin_types: ["sensitive", "dry", "normal"],
    concerns: ["redness", "sensitivity", "barrier repair"],
    price_range: "budget",
    price_usd: 16,
    size_ml: 60,
    rating: 4.5,
    description: "Fragrance-free calming serum with 49% Centella extract to soothe and strengthen sensitive skin."
  },
  {
    id: "some-by-mi-aha-bha-pha-serum",
    name: "AHA BHA PHA 30 Days Miracle Serum",
    brand: "Some By Mi",
    product_type: "serum",
    key_ingredients: ["glycolic_acid", "salicylic_acid", "tea_tree"],
    skin_types: ["oily", "acne-prone", "combination"],
    concerns: ["acne", "texture", "pores"],
    price_range: "budget",
    price_usd: 18,
    size_ml: 50,
    rating: 4.3,
    description: "Triple-action serum with AHA, BHA, and PHA for clearer, smoother skin in 30 days."
  },
  {
    id: "klairs-vitamin-c-serum",
    name: "Freshly Juiced Vitamin Drop",
    brand: "Dear, Klairs",
    product_type: "serum",
    key_ingredients: ["vitamin_c"],
    skin_types: ["normal", "dry", "combination"],
    concerns: ["brightening", "dark spots", "antioxidant"],
    price_range: "mid",
    price_usd: 23,
    size_ml: 35,
    rating: 4.4,
    description: "Gentle 5% vitamin C serum that brightens without irritation. Great for vitamin C beginners."
  },

  // Moisturizers
  {
    id: "cosrx-snail-cream",
    name: "Advanced Snail 92 All in One Cream",
    brand: "COSRX",
    product_type: "moisturizer",
    key_ingredients: ["snail_mucin"],
    skin_types: ["dry", "normal", "combination"],
    concerns: ["hydration", "repair", "anti-aging"],
    price_range: "budget",
    price_usd: 26,
    size_ml: 100,
    rating: 4.6,
    description: "Rich yet lightweight cream with 92% snail mucin for deep hydration and skin repair."
  },
  {
    id: "illiyoon-ceramide-cream",
    name: "Ceramide Ato Concentrate Cream",
    brand: "Illiyoon",
    product_type: "moisturizer",
    key_ingredients: ["ceramides"],
    skin_types: ["dry", "sensitive", "normal"],
    concerns: ["dryness", "barrier repair", "sensitivity"],
    price_range: "budget",
    price_usd: 18,
    size_ml: 200,
    rating: 4.8,
    description: "Award-winning ceramide cream that deeply moisturizes and repairs damaged skin barrier."
  },
  {
    id: "beauty-of-joseon-dynasty-cream",
    name: "Dynasty Cream",
    brand: "Beauty of Joseon",
    product_type: "moisturizer",
    key_ingredients: ["rice_bran", "ginseng"],
    skin_types: ["dry", "normal"],
    concerns: ["anti-aging", "nourishing", "hydration"],
    price_range: "mid",
    price_usd: 22,
    size_ml: 50,
    rating: 4.5,
    description: "Luxurious traditional Korean cream with rice and ginseng for radiant, youthful skin."
  },
  {
    id: "purito-deep-sea-water-cream",
    name: "Deep Sea Pure Water Cream",
    brand: "Purito",
    product_type: "moisturizer",
    key_ingredients: ["hyaluronic_acid", "squalane"],
    skin_types: ["oily", "combination"],
    concerns: ["lightweight hydration", "oil control"],
    price_range: "budget",
    price_usd: 17,
    size_ml: 50,
    rating: 4.4,
    description: "Lightweight gel-cream that hydrates without heaviness. Perfect for oily skin."
  },

  // Sunscreens
  {
    id: "beauty-of-joseon-sunscreen",
    name: "Relief Sun: Rice + Probiotics SPF50+",
    brand: "Beauty of Joseon",
    product_type: "sunscreen",
    key_ingredients: ["rice_bran", "probiotics"],
    skin_types: ["all", "sensitive"],
    concerns: ["sun protection", "hydration"],
    price_range: "budget",
    price_usd: 18,
    size_ml: 50,
    rating: 4.7,
    description: "Organic sunscreen with no white cast that doubles as a primer. K-beauty bestseller!"
  },
  {
    id: "round-lab-birch-sunscreen",
    name: "Birch Juice Moisturizing Sun Cream SPF50+",
    brand: "Round Lab",
    product_type: "sunscreen",
    key_ingredients: ["birch_sap", "hyaluronic_acid"],
    skin_types: ["dry", "normal", "sensitive"],
    concerns: ["sun protection", "hydration"],
    price_range: "budget",
    price_usd: 16,
    size_ml: 50,
    rating: 4.5,
    description: "Hydrating mineral sunscreen with birch sap. No white cast, dewy finish."
  },
  {
    id: "isntree-hyaluronic-sunscreen",
    name: "Hyaluronic Acid Watery Sun Gel SPF50+",
    brand: "Isntree",
    product_type: "sunscreen",
    key_ingredients: ["hyaluronic_acid"],
    skin_types: ["oily", "combination", "normal"],
    concerns: ["sun protection", "lightweight"],
    price_range: "budget",
    price_usd: 17,
    size_ml: 50,
    rating: 4.6,
    description: "Lightweight, watery gel sunscreen perfect for oily skin. No greasy residue."
  },

  // Masks
  {
    id: "cosrx-acne-patches",
    name: "Acne Pimple Master Patch",
    brand: "COSRX",
    product_type: "mask",
    key_ingredients: ["hydrocolloid"],
    skin_types: ["all", "acne-prone"],
    concerns: ["acne", "spot treatment"],
    price_range: "budget",
    price_usd: 6,
    rating: 4.8,
    description: "Hydrocolloid patches that flatten and heal pimples overnight. Cult favorite!"
  },
  {
    id: "medicube-collagen-mask",
    name: "Collagen Jelly Mask",
    brand: "Medicube",
    product_type: "mask",
    key_ingredients: ["collagen", "hyaluronic_acid"],
    skin_types: ["dry", "normal", "aging"],
    concerns: ["anti-aging", "hydration", "firmness"],
    price_range: "mid",
    price_usd: 25,
    rating: 4.4,
    description: "Bouncy jelly mask that firms and hydrates for plump, youthful skin."
  }
];

interface SearchParams {
  product_type?: string;
  ingredients?: string[];
  skin_type?: string;
  price_range?: string;
  brand?: string;
  limit?: number;
}

export function searchProducts(params: SearchParams): Product[] {
  let results = [...products];

  if (params.product_type) {
    results = results.filter(p => p.product_type === params.product_type);
  }

  if (params.skin_type) {
    results = results.filter(p =>
      p.skin_types.includes(params.skin_type!) ||
      p.skin_types.includes("all")
    );
  }

  if (params.price_range) {
    results = results.filter(p => p.price_range === params.price_range);
  }

  if (params.brand) {
    results = results.filter(p =>
      p.brand.toLowerCase().includes(params.brand!.toLowerCase())
    );
  }

  if (params.ingredients && params.ingredients.length > 0) {
    const normalizedIngredients = params.ingredients.map(i =>
      i.toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_")
    );
    results = results.filter(p =>
      normalizedIngredients.some(ing =>
        p.key_ingredients.includes(ing)
      )
    );
  }

  return results.slice(0, params.limit ?? 10);
}

export function getProductById(id: string): Product | null {
  return products.find(p => p.id === id) ?? null;
}

export function getProductsByType(type: string): Product[] {
  return products.filter(p => p.product_type === type);
}
