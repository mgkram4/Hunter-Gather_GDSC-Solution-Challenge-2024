import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePostAdd } from "react-icons/md";
import Link from "next/link";
import { ROUTES } from "@config/routes";

export default function bottomnavbar() {
  return (
    <div className="fixed flex justify-center space-x-32 bottom-0 w-full bg-primary bg-opacity-70 p-4  box-border md:hidden ">
      <Link href={ROUTES.HOME} className="text-white hover:text-gray-300 mr-4">
        <IoHomeOutline className="w-7 h-7" />
      </Link>
      <Link href={ROUTES.POST} className="text-white hover:text-gray-300 mr-4">
        <MdOutlinePostAdd className="w-7 h-7 " />
      </Link>
      <Link href={ROUTES.PROFILE} className="text-white hover:text-gray-300">
        <CgProfile className="w-7 h-7" />
      </Link>
    </div>
  );
}
