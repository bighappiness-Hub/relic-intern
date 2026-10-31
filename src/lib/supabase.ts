import { createClient } from "@supabase/supabase-js";

/**
 * Supabase クライアント。
 * .env.local に VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY を設定すると有効になります。
 * 未設定の間は null となり、src/lib/api.ts はモックデータを返します。
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
