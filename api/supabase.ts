import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@config/constants";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

//  function for signing up a new user using Supabase authentication
async function signUpNewUser() {
  //Attempt Sign up new user
  const { data, error } = await supabase.auth.signUp({
    email: "example@email.com",
    password: "example-password",
    options: {
      emailRedirectTo: "https://example.com/welcome",
    },
  });
}
