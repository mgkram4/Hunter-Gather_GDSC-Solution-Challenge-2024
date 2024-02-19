import { RxHamburgerMenu } from "react-icons/rx";
import { PiCookingPotLight } from "react-icons/pi";
import { ROUTES } from "@config/routes";
import { createClient } from "@utils/supabase/server";
import { cookies, headers } from "next/headers";
import { signOutAction } from "../actions/auth/signup/actions";
import Button, { BUTTON_VARIANTS } from "./button/button";

// Component definition
export default async function Navbar() {
  const headerList = headers();
  const pathname = headerList.get("x-path") || "";
  const LIGHT_PATHS = [ROUTES.SIGNIN, ROUTES.SIGNUP];
  const isLightTheme = LIGHT_PATHS.some((route) => pathname === route);

  const backgroundColor = isLightTheme ? "bg-white" : "bg-primary";
  const textColor = isLightTheme
    ? "text-secondary hover:text-green-500"
    : "text-white";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await supabase.auth.getUser();
  const email = user.data.user?.email;

  return (
    <div
      className={`${backgroundColor} border-gray-200 p-2 h-fit sticky top-0 w-full z-10`}
    >
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <a href={ROUTES.HOME} className="flex items-center space-x-3">
          {/* Logo */}
          <PiCookingPotLight className="w-10 h-10" />
        </a>
        {/* Mobile Hamburger */}
        <button className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
          <RxHamburgerMenu className="w-6 h-6" />
        </button>
        {/* Nav Elements */}
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium text-lg flex flex-col p-1 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-4 md:mt-0  ">
            <li>
              <a href={ROUTES.HOME} className={`block ${textColor} p-2`}>
                Recipes
              </a>
            </li>
            <li>
              <a href={ROUTES.PROFILE} className={`block ${textColor} p-2`}>
                Profile
              </a>
            </li>

            {email ? (
              <>
                <li>
                  <a
                    href={ROUTES.BOOKMARKS}
                    className={`block ${textColor} p-2`}
                  >
                    Bookmarks
                  </a>
                </li>
                <li>
                  <a
                    href={ROUTES.CHEF_ASSISTANT}
                    className={`block ${textColor} p-2`}
                  >
                    Chef Assistant
                  </a>
                </li>
                <form action={signOutAction}>
                  <Button varient={BUTTON_VARIANTS.NAVBAR}>{email}</Button>
                </form>
              </>
            ) : (
              <li>
                <a href={ROUTES.SIGNIN}>
                  <Button varient={BUTTON_VARIANTS.NAVBAR}>Login</Button>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
