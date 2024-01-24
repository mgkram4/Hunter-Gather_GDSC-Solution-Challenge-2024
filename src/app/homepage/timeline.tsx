import Postsmall from "./postsmall";

export default function timeline() {
  return (
    <div className="ml-auto md:w-[70%] h-full min-h-screen flex-col border-l border-r border-gray-600">
      <div className="grid grid-cols-2 text-center m-2 text-xl font-bold">
        <div>Following</div>
        <div>Recommended</div>
      </div>
      <div className="py-2 border-gray-600 items-center relative">
        <div className="flex flex-col">
          <div className="border-gray-600 border-t border-b p-2 flex space-x-4 mr-8">
            <div>
              <div className="w-full h-8 rounded-full"></div>
            </div>
            <div className="flex flex-col space-y-2 p-2">
              <div className="flex items-center space-x-1"></div>
              <Postsmall />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
