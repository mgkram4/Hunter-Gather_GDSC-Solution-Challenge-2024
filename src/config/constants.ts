export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const FIREBASE_CONFIG = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG || ""
); ;