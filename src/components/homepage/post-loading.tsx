import { BiComment } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";

export default function PostLoading() {
  return (
    <>
      <div className="bg-white p-4 mb-4 rounded-md shadow-md border-2 border-gray-200 ">
        <div className="font-bold text-xl mb-2">Consulting our chefs...</div>
        <div className="text-gray-600 mb-4"></div>

        <img
          src="https://fakeimg.pl/500x128?text=Loading...&font=bebas"
          className="w-full h-32 object-cover rounded-md mb-2"
        />

        <div className="flex items-center justify-between  mt-4">
          <div className="flex items-center space-x-2">
            <div className="text-sm font-semibold">Loading</div>
            <div className="text-sm text-gray-500"></div>
            <div className="text-sm text-gray-500"></div>
          </div>

          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <span className="text-sm"></span>
              <CiHeart className="w-6 h-6 hover:text-red-500 active:bg-red-300 active:text-white rounded cursor-pointer transition-all duration-300" />
            </div>

            <div className="flex items-center space-x-1"></div>

            <div className="flex items-center space-x-1">
              <BiComment className="w-6 h-6 hover:text-green-500 active:bg-green-300 active:text-white rounded cursor-pointer transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
