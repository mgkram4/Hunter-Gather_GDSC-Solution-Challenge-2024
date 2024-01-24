"use server";

import { signUpWithEmailAction } from "@actions/auth/signup/actions";
import XSignInButton from "@components/button/x-signin";
import GoogleSignInButton from "@components/button/g-signin";
import Link from "next/link";
import { PiCookingPotLight } from "react-icons/pi";
import Input from "@components/input/input";
import { ROUTES } from "@/src/config/routes";
import Button, { BUTTON_VARIANTS } from "@/src/components/button/button";

interface SignUpProps {
  searchParams?: {
    error?: string;
  };
}

export default async function SignUp({ searchParams }: SignUpProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white flex flex-col items-center">
        {/* Icon eventually */}
        <PiCookingPotLight className="w-20 h-20 mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <form
          className="grid grid-cols-1 gap-4 w-full"
          action={signUpWithEmailAction}
        >
          <Input label="Email:" type="email" name="email" isRequired />
          <Input label="Password:" type="password" name="password" isRequired />
          <Button varient={BUTTON_VARIANTS.PRIMARY}>Sign Up</Button>

          <div className="mt-4 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <GoogleSignInButton isSignUp />
          <XSignInButton isSignUp />
          <p className="text-red-500 text-center font-bold">
            {searchParams?.error}
          </p>
        </form>
        <Link href={ROUTES.SIGNIN}>
          <h3 className="flex mt-2 items-center justify-center text-gray-400 cursor-pointer hover:underline">
            Already a User? Login
          </h3>
        </Link>
      </div>

      <div className="w-full sm:w-5/6 md:w-3/4 hidden md:block">
        <img
          src="/signup.jpg"
          alt="login"
          className="w-full h-screen object-cover rounded-l border-r-black border-r-2"
        />
      </div>
    </div>
  );
}
