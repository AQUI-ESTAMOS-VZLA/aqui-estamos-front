'use client';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getConfig } from './config';

let client: SupabaseClient | null = null;

// Lazily create a single browser Supabase client (used for magic-link auth).
export function getSupabase(): SupabaseClient | null {
  if (typeof window === 'undefined') return null;
  if (client) return client;
  const cfg = getConfig();
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) return null;
  client = createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
  return client;
}
