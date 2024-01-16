"use server";

import { signUpWithEmailAction } from "@/src/actions/auth/signup/actions";
import XSignInButton from "@/src/components/button/x-signin";
import GoogleSignInButton from "@components/button/g-signin";

interface SignUpProps {
  searchParams?: {
    error?: string;
  };
}

export default async function SignUp({ searchParams }: SignUpProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-sm mx-auto mt-8 p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form className="grid grid-cols-1 gap-4" action={signUpWithEmailAction}>
          <label className="block">
            Email:
            <input
              type="email"
              className="mt-1 p-2 w-full rounded border-2 border-gray-200"
              name="email"
              required
            />
          </label>

          <label className="block">
            Password:
            <input
              type="password"
              className="mt-1 p-2 w-full rounded border-2 border-gray-200"
              name="password"
              required
            />
          </label>

          <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer">
            Sign up
          </button>
          <GoogleSignInButton isSignUp />
          <XSignInButton isSignUp />
          <p className="text-red-500 text-center font-bold">
            {searchParams?.error}
          </p>
        </form>
      </div>
    </div>
  );
}
