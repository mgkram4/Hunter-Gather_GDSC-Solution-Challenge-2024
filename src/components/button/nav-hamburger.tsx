"use client";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiBookmark } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { CiHashtag } from "react-icons/ci";
import { GiCook } from "react-icons/gi";
import { MdOutlinePostAdd } from "react-icons/md";
import { PiCookingPotLight } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";

import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@config/routes";

export default function NavHamburger() {
  const [open, setOpen] = useState(false);

  function handleLinkClick() {
    setOpen(false);
  }

  return (
    <div
      className={`mr-4 flex items-center justify-between rounded-xl m-2 focus:outline-none ${
        open ? "border-none" : " focus:border-green-600"
      }`}
    >
      <div className="cursor-pointer ml-6 " onClick={() => setOpen(!open)}>
        <RxHamburgerMenu className="w-6 h-10 text-slate-200" />
      </div>

      <div className="ml-4"></div>

      <div
        className={`text-black z-10 bg-slate-200 space-y-12 text-3xl font-weight-80 flex flex-col absolute left-[-3%]  top-20 h-screen w-4/5 md:w-3/5  pt-20 shadow-2xl transition-transform duration-300 ease-in-out ${
          open
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none transition-opacity duration-300"
        }`}
      >
        <Link
          href={ROUTES.HOME}
          onClick={handleLinkClick}
          className={`flex items-center p-2 transition-colors duration-300 hover:text-gray-500`}
        >
          <IoHomeOutline className="w-8 h-8 mr-2 text-primary" />
          <span>Home</span>
        </Link>
        <Link
          href={ROUTES.PROFILE}
          onClick={handleLinkClick}
          className={`flex items-center p-2 transition-colors duration-300 hover:text-gray-500`}
        >
          <CgProfile className="w-8 h-8 mr-2 text-primary" />
          <span>Profile</span>
        </Link>
        <Link
          href={ROUTES.BOOKMARKS}
          onClick={handleLinkClick}
          className={`flex items-center p-2 transition-colors duration-300 hover:text-gray-500`}
        >
          <CiBookmark className="w-8 h-8 mr-2 text-primary" />
          <span>Bookmarks</span>
        </Link>

        <Link
          href={ROUTES.CHEF_ASSISTANT}
          onClick={handleLinkClick}
          className={`flex items-center p-2 transition-colors duration-300 hover:text-gray-500`}
        >
          <GiCook className="w-8 h-8 mr-2 text-primary" />
          <span>Cook Assistant</span>
        </Link>
        <Link
          href={ROUTES.POST}
          onClick={handleLinkClick}
          className={`flex items-center p-2 transition-colors duration-300 hover:text-gray-500`}
        >
          <MdOutlinePostAdd className="w-8 h-8 mr-2 text-primary" />
          <span>Post</span>
        </Link>
        <PiCookingPotLight className="ml-36 w-20 h-20 text-primary" />
      </div>
    </div>
  );
}
