-- K-Beauty Skin Guide - Products Database Schema
-- Run this SQL in Supabase SQL Editor to create the products table

-- Products table for real-time search
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  product_type VARCHAR(50) NOT NULL CHECK (product_type IN (
    'cleanser', 'toner', 'essence', 'serum', 'moisturizer',
    'sunscreen', 'mask', 'exfoliator', 'eye_cream', 'oil'
  )),
  description TEXT,
  price_range VARCHAR(20) CHECK (price_range IN ('budget', 'mid', 'premium')),
  price_krw INTEGER,
  skin_types TEXT[] DEFAULT '{}',
  key_ingredients TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  image_url TEXT,
  purchase_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for search performance
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price_range);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_skin_types ON products USING GIN(skin_types);
CREATE INDEX IF NOT EXISTS idx_products_ingredients ON products USING GIN(key_ingredients);

-- Full-text search index for name and description
CREATE INDEX IF NOT EXISTS idx_products_search ON products USING GIN(
  to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(brand, ''))
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active products
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (is_active = true);

-- Policy: Only service role can insert/update/delete
CREATE POLICY "Products are modifiable by service role" ON products
  FOR ALL USING (auth.role() = 'service_role');

-- Sample seed data (K-Beauty products)
INSERT INTO products (name, brand, product_type, description, price_range, price_krw, skin_types, key_ingredients, rating) VALUES
-- Cleansers
('Low pH Good Morning Gel Cleanser', 'COSRX', 'cleanser', 'Gentle, low pH cleanser with tea tree oil for morning cleansing', 'budget', 12000, ARRAY['oily', 'combination', 'sensitive'], ARRAY['tea_tree', 'bha'], 4.5),
('Green Tea Foam Cleanser', 'Innisfree', 'cleanser', 'Antioxidant-rich foam cleanser with Jeju green tea', 'budget', 9000, ARRAY['oily', 'combination', 'normal'], ARRAY['green_tea'], 4.3),
('Rice Water Bright Cleansing Foam', 'The Face Shop', 'cleanser', 'Brightening cleanser with rice water extract', 'budget', 8000, ARRAY['dry', 'normal', 'combination'], ARRAY['rice_water', 'ceramides'], 4.2),

-- Toners
('Galactomyces 95 Tone Balancing Essence', 'COSRX', 'toner', 'First treatment essence with 95% galactomyces ferment filtrate', 'mid', 22000, ARRAY['dry', 'normal', 'combination'], ARRAY['galactomyces', 'niacinamide'], 4.6),
('Mugwort Essence', 'I''m From', 'toner', 'Soothing essence with 100% Korean mugwort extract', 'mid', 28000, ARRAY['sensitive', 'combination', 'oily'], ARRAY['mugwort'], 4.7),
('Green Tea Seed Skin', 'Innisfree', 'toner', 'Hydrating toner with fresh Jeju green tea seeds', 'budget', 18000, ARRAY['dry', 'normal', 'combination'], ARRAY['green_tea', 'hyaluronic_acid'], 4.4),

-- Serums
('Propolis Light Ampule', 'COSRX', 'serum', 'Nourishing propolis ampoule for healthy glow', 'mid', 25000, ARRAY['dry', 'normal', 'sensitive'], ARRAY['propolis'], 4.7),
('Centella Unscented Serum', 'Purito', 'serum', 'Fragrance-free centella serum for sensitive skin', 'mid', 19000, ARRAY['sensitive', 'dry', 'normal'], ARRAY['centella_asiatica', 'niacinamide'], 4.5),
('Vitamin C 23 Serum', 'By Wishtrend', 'serum', 'High-concentration vitamin C for brightening', 'mid', 32000, ARRAY['normal', 'combination', 'oily'], ARRAY['vitamin_c'], 4.4),
('Snail Mucin 96% Power Repairing Essence', 'COSRX', 'essence', 'Lightweight snail essence for hydration and repair', 'mid', 24000, ARRAY['dry', 'normal', 'sensitive', 'combination'], ARRAY['snail_mucin'], 4.8),

-- Moisturizers
('Great Barrier Relief', 'Krave Beauty', 'moisturizer', 'Barrier-strengthening moisturizer with tamanu oil', 'mid', 35000, ARRAY['dry', 'sensitive', 'normal'], ARRAY['tamanu_oil', 'ceramides'], 4.6),
('Centella Blemish Cream', 'COSRX', 'moisturizer', 'Spot treatment cream with centella for blemishes', 'budget', 15000, ARRAY['oily', 'combination', 'sensitive'], ARRAY['centella_asiatica'], 4.3),
('Water Sleeping Mask', 'Laneige', 'moisturizer', 'Overnight hydrating mask with sleep-tox technology', 'mid', 32000, ARRAY['dry', 'normal', 'combination'], ARRAY['hyaluronic_acid'], 4.5),
('Ceramidin Cream', 'Dr. Jart+', 'moisturizer', 'Rich ceramide cream for barrier repair', 'premium', 48000, ARRAY['dry', 'sensitive', 'normal'], ARRAY['ceramides'], 4.7),

-- Sunscreens
('Aqua Sun Gel', 'Missha', 'sunscreen', 'Lightweight SPF50+ gel sunscreen', 'budget', 12000, ARRAY['oily', 'combination', 'normal'], ARRAY['hyaluronic_acid'], 4.4),
('Centella Green Level Unscented Sun', 'Purito', 'sunscreen', 'Gentle mineral sunscreen with centella', 'mid', 18000, ARRAY['sensitive', 'dry', 'normal'], ARRAY['centella_asiatica'], 4.5),
('UV Defense Me Daily Sun Fluid', 'Dr.G', 'sunscreen', 'Lightweight daily sun fluid SPF50+', 'mid', 22000, ARRAY['normal', 'combination', 'oily'], ARRAY['niacinamide'], 4.6),

-- Exfoliators
('AHA 7 Whitehead Power Liquid', 'COSRX', 'exfoliator', 'Gentle AHA exfoliant for whiteheads', 'mid', 22000, ARRAY['dry', 'normal', 'combination'], ARRAY['glycolic_acid'], 4.5),
('BHA Blackhead Power Liquid', 'COSRX', 'exfoliator', 'BHA treatment for blackheads and pores', 'mid', 22000, ARRAY['oily', 'combination'], ARRAY['salicylic_acid'], 4.6),
('Super Volcanic Pore Clay Mask', 'Innisfree', 'exfoliator', 'Deep cleansing volcanic clay mask', 'budget', 15000, ARRAY['oily', 'combination'], ARRAY['volcanic_ash'], 4.4),

-- Masks
('Honey Overnight Mask', 'Cosrx', 'mask', 'Nourishing overnight mask with propolis', 'mid', 20000, ARRAY['dry', 'normal', 'sensitive'], ARRAY['propolis', 'honey'], 4.5),
('Green Tea Seed Eye Cream', 'Innisfree', 'eye_cream', 'Hydrating eye cream with green tea', 'mid', 25000, ARRAY['dry', 'normal', 'combination'], ARRAY['green_tea'], 4.3)

ON CONFLICT DO NOTHING;

-- Verify data
SELECT COUNT(*) as total_products FROM products;
