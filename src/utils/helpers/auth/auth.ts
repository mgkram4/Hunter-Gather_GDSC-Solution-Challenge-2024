import { createClient } from "@utils/supabase/server";
import { cookies } from "next/headers";

type TraditionalAuthData = { email: string; password: string };

/**
 *  Helper functions for returning the Supabase client for SSR.
 *
 * @returns {import("@supabase/supabase-js").SupabaseClient}
 */
export const getSupabaseClient = () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return supabase;
};

/**
 * Helper function for returning the email and password from a FormData object.
 *
 * @param {FormData} formData - FormData object from a form submission.
 * @returns {TraditionalAuthData} - Returns an object with the email and password.
 */
export const getTradtionalAuthFormData = (
  formData: FormData,
): TraditionalAuthData => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  return { email, password };
};
