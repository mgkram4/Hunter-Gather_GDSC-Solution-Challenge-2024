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

export default function Navbarr() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className=" flex items-center justify-between p-2.5 ">
      <div className="cursor-pointer ml-4" onClick={() => setOpen(!open)}>
        <RxHamburgerMenu className="w-8 h-8 mt-2" />
      </div>
      {/* LEFT */}
      <div className="items-center ml-4">
        <Link href="/"></Link>
      </div>

      {/* Mobile */}
      <div
        className={`pl-8 text-black z-10 bg-slate-200 space-y-12 text-3xl font-weight-80 flex flex-col absolute left-0 top-20 h-screen w-3/5 md:w-2/5 pt-20 shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <Link
          href=""
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <IoHomeOutline className="m-2" />
          <span className="">Home</span>
        </Link>
        <Link
          href="/Products"
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <CgProfile className="m-2" />

          <span className="">Profile</span>
        </Link>
        <Link
          href="/Form"
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <CiBookmark className="m-2" />

          <span className="">Bookmarks</span>
        </Link>
        <Link
          href="/Cart"
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <FiShoppingCart className="m-2" />

          <span className="">Shopping List</span>
        </Link>
        <Link
          href="/Cart"
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <CiHashtag className="m-2" />

          <span className="">Hashtag</span>
        </Link>
        <Link
          href="/Cart"
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <GiCook className="m-2" />

          <span className="">Cook Assistant</span>
        </Link>
        <Link
          href="/Cart"
          onClick={handleLinkClick}
          className="flex items-center hover:text-primary hover:duration-500"
        >
          <MdOutlinePostAdd className="m-2" />

          <span className="">Post</span>
        </Link>
        <PiCookingPotLight className="ml-28 w-20 h-20 " />
      </div>
    </div>
  );
}
