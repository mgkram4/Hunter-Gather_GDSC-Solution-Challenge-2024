import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiCookingPotLight } from "react-icons/pi";
import Link from "next/link";
import { ROUTES } from "@config/routes";
import { createClient } from "@utils/supabase/server";
import { cookies } from "next/headers";
import { signOutAction } from "../actions/auth/signup/actions";
import Burger from "./button/nav-hamburger";
import { FaSignInAlt } from "react-icons/fa";

export default async function Navbar() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const user = await supabase.auth.getUser();
  const email = user.data.user?.email;

  return (
    <div className="bg-primary ">
      <div className="w-full flex  items-center p-2">
        {/* Mobile Hamburger (Always visible) */}
        <Burger />
        <Link href="/">
          <PiCookingPotLight className="w-14 h-14 text-slate-200" />
        </Link>
        <div className="flex items-center ml-auto space-x-4">
          {/* Logo */}
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border-2  rounded-md focus:outline-none focus:border-green-600 bg-transparent placeholder:text-white"
          />

          <div className="  md:items-end flex ">
            {email ? (
              <form action={signOutAction}>
                <button className="block text-black hover:bg-green-700 p-2 rounded-xl bg-white">
                  {email}
                </button>
              </form>
            ) : (
              <Link
                href={ROUTES.SIGNIN}
                className="flex items-center justify-center border-2  px-2 py-2 text-lg font-semibold text-white bg-primary rounded-md hover:bg-green-900 focus:outline-none  focus:border-green-600"
              >
                <FaSignInAlt className="mr-2" /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
