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
    <div className="ml-4 mr-4 flex items-center justify-between rounded-xl  border-4 m-2 hover:bg-green-900 focus:outline-none focus:bg-green-900  focus:border-green-600 ">
      <div className="cursor-pointer ml-4" onClick={() => setOpen(!open)}>
        <RxHamburgerMenu className="w-6 h-10 text-slate-200 " />
      </div>

      <div className="items-center ml-4"></div>

      <div
        className={`pl-8 text-black z-10 bg-slate-200 space-y-12 text-2xl font-weight-80 flex flex-col absolute left-0 top-20 h-screen w-3/5 md:w-2/5 pt-20 shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <Link
          href={ROUTES.HOME}
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <IoHomeOutline className="m-2" />
          <span>Home</span>
        </Link>
        <Link
          href={ROUTES.PROFILE}
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <CgProfile className="m-2" />

          <span>Profile</span>
        </Link>
        <Link
          href={ROUTES.SIGNIN}
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <CiBookmark className="m-2" />

          <span>Bookmarks</span>
        </Link>
        <Link
          href={ROUTES.SHOPPINGLIST}
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <FiShoppingCart className="m-2" />

          <span>Shopping List</span>
        </Link>
        <Link
          href={ROUTES.HASHTAG}
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <CiHashtag className="m-2" />

          <span>Hashtag</span>
        </Link>
        <Link
          href={ROUTES.CHEF_ASSISTANT}
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <GiCook className="m-2" />

          <span>Cook Assistant</span>
        </Link>
        <Link
          href={ROUTES.POST}
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <MdOutlinePostAdd className="m-2" />

          <span>Post</span>
        </Link>
        <PiCookingPotLight className="ml-28 w-20 h-20 " />
      </div>
    </div>
  );
}
