import { signInWithEmailAction } from "@actions/auth/signup/actions";
import XSignInButton from "@components/button/x-signin";
import GoogleSignInButton from "@components/button/g-signin";
import Link from "next/link";
import { PiCookingPotLight } from "react-icons/pi";
import Input from "@components/input/input";
import { ROUTES } from "@config/routes";
import Button, { BUTTON_VARIANTS } from "@components/button/button";

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
          <Input label="Email:" type="email" name="email" isRequired />
          <Input label="Password:" type="password" name="password" isRequired />
          <Button varient={BUTTON_VARIANTS.PRIMARY}>Sign In</Button>

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
        <Link href={ROUTES.SIGNUP}>
          <h3 className="flex mt-2 items-center justify-center text-gray-400 cursor-pointer hover:underline">
            New? Sign Up!
          </h3>
        </Link>
      </div>
    </div>
  );
}
