// Supabase-based Product Search Service
// Replaces static product data with real-time database queries

import { getSupabaseClient } from '../auth/supabase.js';

export interface Product {
  id: string;
  name: string;
  brand: string;
  product_type: string;
  description: string | null;
  price_range: 'budget' | 'mid' | 'premium' | null;
  price_krw: number | null;
  skin_types: string[];
  key_ingredients: string[];
  rating: number | null;
  image_url: string | null;
  purchase_url: string | null;
}

export interface SearchParams {
  product_type?: string;
  ingredients?: string[];
  skin_type?: string;
  price_range?: string;
  brand?: string;
  query?: string;  // Full-text search
  limit?: number;
}

/**
 * Search products from Supabase database
 */
export async function searchProductsFromDB(params: SearchParams): Promise<Product[]> {
  const supabase = getSupabaseClient();
  const limit = params.limit ?? 10;

  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('rating', { ascending: false, nullsFirst: false })
    .limit(limit);

  // Filter by product type
  if (params.product_type) {
    query = query.eq('product_type', params.product_type);
  }

  // Filter by price range
  if (params.price_range) {
    query = query.eq('price_range', params.price_range);
  }

  // Filter by brand (case-insensitive partial match)
  if (params.brand) {
    query = query.ilike('brand', `%${params.brand}%`);
  }

  // Filter by skin type (array contains)
  if (params.skin_type) {
    query = query.contains('skin_types', [params.skin_type]);
  }

  // Filter by ingredients (array overlap - matches if any ingredient matches)
  if (params.ingredients && params.ingredients.length > 0) {
    const normalizedIngredients = params.ingredients.map(i =>
      i.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_')
    );
    query = query.overlaps('key_ingredients', normalizedIngredients);
  }

  // Full-text search on name, description, brand
  if (params.query) {
    query = query.or(`name.ilike.%${params.query}%,brand.ilike.%${params.query}%,description.ilike.%${params.query}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Product search error:', error);
    throw new Error(`Failed to search products: ${error.message}`);
  }

  return (data ?? []).map(p => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    product_type: p.product_type,
    description: p.description,
    price_range: p.price_range,
    price_krw: p.price_krw,
    skin_types: p.skin_types ?? [],
    key_ingredients: p.key_ingredients ?? [],
    rating: p.rating,
    image_url: p.image_url,
    purchase_url: p.purchase_url,
  }));
}

/**
 * Get a single product by ID
 */
export async function getProductByIdFromDB(id: string): Promise<Product | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    throw new Error(`Failed to get product: ${error.message}`);
  }

  return data ? {
    id: data.id,
    name: data.name,
    brand: data.brand,
    product_type: data.product_type,
    description: data.description,
    price_range: data.price_range,
    price_krw: data.price_krw,
    skin_types: data.skin_types ?? [],
    key_ingredients: data.key_ingredients ?? [],
    rating: data.rating,
    image_url: data.image_url,
    purchase_url: data.purchase_url,
  } : null;
}

/**
 * Get products by type
 */
export async function getProductsByTypeFromDB(type: string, limit: number = 10): Promise<Product[]> {
  return searchProductsFromDB({ product_type: type, limit });
}

/**
 * Check if products table exists and has data
 */
export async function checkProductsTableExists(): Promise<boolean> {
  const supabase = getSupabaseClient();

  try {
    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.warn('Products table check failed:', error.message);
      return false;
    }

    return (count ?? 0) > 0;
  } catch {
    return false;
  }
}
