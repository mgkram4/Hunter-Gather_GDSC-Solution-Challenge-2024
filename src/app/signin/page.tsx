import { signInWithEmailAction } from "@/src/actions/auth/signup/actions";
import XSignInButton from "@/src/components/button/x-signin";
import GoogleSignInButton from "@components/button/g-signin";
import Link from "next/link";
import { PiCookingPotLight } from "react-icons/pi";

interface SignUpProps {
  searchParams?: {
    error?: string;
  };
}

export default function SignIn({ searchParams }: SignUpProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="">
        <img
          src="/signin.jpg"
          alt="login"
          className="hidden md:block w-full h-screen object-cover  "
        />
      </div>
      <div className="w-full max-w-md p-8 bg-white flex flex-col items-center">
        {/* Icon eventually */}
        <PiCookingPotLight className="w-20 h-20 mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        <form
          className="grid grid-cols-1 gap-4 w-full"
          action={signInWithEmailAction}
        >
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

          <button className="bg-primary text-white p-2 rounded hover:bg-opacity-90 cursor-pointer">
            Sign in
          </button>
          <div className="mt-4 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center test-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <GoogleSignInButton isSignUp />
          <XSignInButton isSignUp />
          <p className="text-red-500 text-center font-bold">
            {searchParams?.error}
          </p>
        </form>
        <Link href="/">
          <h3 className="flex mt-2 items-center justify-center text-gray-400 cursor-pointer hover:underline">
            New? Sign Up!
          </h3>
        </Link>
      </div>
    </div>
  );
}
