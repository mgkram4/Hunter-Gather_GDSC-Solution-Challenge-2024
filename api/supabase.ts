import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@config/constants";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function signUpNewUser() {
  const { data, error } = await supabase.auth.signUp({
    email: "example@email.com",
    password: "example-password",
    options: {
      emailRedirectTo: "https://example.com/welcome",
    },
  });
}
