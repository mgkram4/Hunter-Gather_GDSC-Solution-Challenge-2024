import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiCookingPotLight } from "react-icons/pi";
import Link from "next/link";
import { ROUTES } from "@config/routes";
import { createClient } from "@utils/supabase/server";
import { cookies } from "next/headers";
import { signOutAction } from "../actions/auth/signup/actions";
import Navbarr from "./navhamburger";
import { CiLogin } from "react-icons/ci";

export default async function Navbar() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const user = await supabase.auth.getUser();
  const email = user.data.user?.email;

  return (
    <div className="bg-primary ">
      <div className="w-full flex flex-wrap items-center p-2">
        {/* Mobile Hamburger (Always visible) */}
        <Navbarr />
        <PiCookingPotLight className="w-14 h-14" />
        <div className="flex items-center ml-auto space-x-4">
          {/* Logo */}
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 border border-black rounded-md focus:outline-none focus:border-green-600 bg-transparent placeholder:text-white"
          />

          <div className="  md:items-end flex justify-end">
            {email ? (
              <form action={signOutAction}>
                <button className="block text-black hover:bg-green-700 p-2 rounded-xl bg-white">
                  {email}
                </button>
              </form>
            ) : (
              <Link href={ROUTES.SIGNIN}>
                <button className="block text-white hover:bg-green-700 px-2 py-1  rounded-xl border border-black bg">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
