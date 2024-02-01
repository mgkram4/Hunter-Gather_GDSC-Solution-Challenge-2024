"use client";

import { BASE_URL } from "@/src/config/constants";
import { API_ROUTES } from "@/src/config/routes";
import { createClient } from "@/src/utils/supabase/client";
import { FcGoogle } from "react-icons/fc";

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
      className="flex items-center justify-center px-4 py-2 font-semibold text-black p-2 rounded cursor-pointer border-2 border-gray-200 hover:opacity-70 active:bg-gray-200"
    >
      <FcGoogle className="mr-2 text-2xl" /> Continue with Google
    </button>
  );
}
