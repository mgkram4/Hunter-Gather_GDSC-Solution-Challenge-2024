// Supabase
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Drizzle
export const POSTGRES_CONNECTION_STRING =
  process.env.NEXT_PUBLIC_POSTGRES_CONNECTION_STRING ||
  "postgres://postgres:postgres@localhost:5432/postgres";

export enum HTTP_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}
