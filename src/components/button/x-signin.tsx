"use client";

import { BASE_URL } from "@/src/config/constants";
import { API_ROUTES, ROUTES } from "@/src/config/routes";
import { createClient } from "@/src/utils/supabase/client";
import { FaXTwitter } from "react-icons/fa6";

export interface XSignInButtonProps {
  isSignUp?: boolean;
}

export default function XSignInButton({ isSignUp }: XSignInButtonProps) {
  const signInWithX = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo: `${BASE_URL}${API_ROUTES.AUTH_CALLBACK}?isSignup=${isSignUp}&provider=x`,
      },
    });
  };

  return (
    <button
      onClick={signInWithX}
      className="flex items-center justify-center text-gray-600 p-2 rounded cursor-pointer border-2 border-gray-600  hover:opacity-70"
    >
      <FaXTwitter className="text-2xl mr-2" /> Continue with X
    </button>
  );
}
