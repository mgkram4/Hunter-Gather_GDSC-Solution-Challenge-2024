"use client";

import { API_ROUTES, CLIENT_ROUTES } from "@config/routes";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_KEY, SUPABASE_URL } from "@config/constants";

export default function SignUp() {
  const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpWithEmail = async (e: any) => {
    e.preventDefault();
    setError("");

    const body = JSON.stringify({
      email,
      password,
    });

    const req = await fetch(API_ROUTES.SIGNUP, {
      method: "POST",
      body,
    });

    const res = await req.json();

    if (!req.ok) {
      setError(res.message);
    } else {
      // TODO: redirect to the taste profile page
      window.location.href = CLIENT_ROUTES.HOME;
    }
  };

  const handleSignUpWithGoogle = async (e: any) => {
    e.preventDefault();
    setError("");

    const auth = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },

        redirectTo: `${window.location.origin}${API_ROUTES.PROVIDER_SIGNUP}?provider=google`,
      },
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-sm mx-auto mt-8 p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form className="grid grid-cols-1 gap-4">
          <label className="block">
            Email:
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="block">
            Password:
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            onClick={handleSignUpWithEmail}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer"
          >
            Sign Up
          </button>
          <button
            onClick={handleSignUpWithGoogle}
            className="border-2 border-gray-200 p-2 rounded cursor-pointer text-green-500"
          >
            Continue with Google
          </button>
        </form>
        <p>{error}</p>
      </div>
    </div>
  );
}
