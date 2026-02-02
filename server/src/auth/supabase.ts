import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase client for server-side operations (DB only)
let supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY;

    if (!url || !serviceKey) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables');
    }

    supabase = createClient(url, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return supabase;
}

/**
 * Google token verification response
 */
interface GoogleTokenInfo {
  sub: string;        // Google user ID (unique)
  email: string;
  email_verified: string;
  name?: string;
  picture?: string;
  error_description?: string;
}

/**
 * Verify Google access token and extract user ID (sub)
 */
export async function verifyToken(accessToken: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`
    );

    if (!response.ok) {
      console.error('Google token verification failed:', response.status);
      return null;
    }

    const tokenInfo: GoogleTokenInfo = await response.json();

    if (tokenInfo.error_description) {
      console.error('Google token error:', tokenInfo.error_description);
      return null;
    }

    console.log('Google user verified:', tokenInfo.email);
    return tokenInfo.sub; // Return Google's unique user ID
  } catch (err) {
    console.error('Token verification error:', err);
    return null;
  }
}

// Types for skin_logs table
export interface SkinLog {
  id: string;
  user_id: string;
  logged_at: string;
  hydration: number | null;
  oiliness: number | null;
  has_breakouts: boolean;
  breakout_areas: string[] | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SkinLogInput {
  hydration?: number;
  oiliness?: number;
  has_breakouts?: boolean;
  breakout_areas?: string[];
  notes?: string;
  logged_at?: string;
}
