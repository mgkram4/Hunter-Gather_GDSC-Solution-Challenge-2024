"use client";

import { BASE_URL } from "@/src/config/constants";
import { API_ROUTES, ROUTES } from "@/src/config/routes";
import { createClient } from "@/src/utils/supabase/client";

export interface GoogleSignInButtonProps {
  isSignUp?: boolean;
}

export default function GoogleSignInButton({
  isSignUp,
}: GoogleSignInButtonProps) {
  const signInWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${BASE_URL}${API_ROUTES.AUTH_CALLBACK}?isSignup=${isSignUp}&provider=google`,
      },
    });
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="text-green-500 p-2 rounded cursor-pointer border-2 border-gray-200"
    >
      Continue with Google
    </button>
  );
}
