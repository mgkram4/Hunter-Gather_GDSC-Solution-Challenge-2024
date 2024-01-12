import { RxHamburgerMenu } from "react-icons/rx";
import { PiCookingPotLight } from "react-icons/pi";

export default function Navbar() {
  return (
    <div className="bg-white border-gray-200 m-2 ">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 ">
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
              <a
                href="#"
                className=" block text-green-600 p-2  hover:text-green-500 "
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block text-gray-900 p-2  hover:text-green-500 "
              >
                Recipes
              </a>
            </li>
            <li>
              <button className="block text-white  hover:bg-green-700 p-2 rounded-xl bg-green-600 ">
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
