import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/src/config/constants";
import { Database } from "@/supabase/functions/_shared/types/types";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Utility function for creating a Supabase client on the server.
 *
 * @param cookieStore
 * @returns
 */
export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.delete({ name, ...options });
      },
    },
  });
};
