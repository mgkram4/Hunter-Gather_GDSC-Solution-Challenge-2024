export default function Sidebar() {
  return (
    <div className="hidden md:block md:w-[30%] ml-auto top-0 overflow-scroll mt-4 w-full  flex-col h-screen px-6 items-stretch">
      <div className="flex flex-col bg-gray-200 rounded-xl mt-4">
        <h3 className="font-bold text-xl my-4 ml-4">What's happening</h3>
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="hover:bg-gray-300 p-4 last:rounded-xl">
              <div className="font-bold text-lg">#Trending{i + i}</div>
              <div className="text-xs text-neutral-700">35.4k</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col bg-gray-200 rounded-xl mt-4">
        <h3 className="font-bold text-xl my-4 ml-4">Trending near me</h3>
        <div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="hover:bg-gray-300 p-4 last:rounded-xl">
              <div className="font-bold text-lg">#Trending{i + i}</div>
              <div className="text-xs text-neutral-700">35.4k</div>
            </div>
          ))}
        </div>
      </div>{" "}
      <div className="flex flex-col bg-gray-200 rounded-xl mt-4">
        <h3 className="font-bold text-xl my-4 ml-4">Who to follow</h3>
        <div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="hover:bg-gray-300 p-4 last:rounded-xl">
              <div className="flex flex-col space-y-2">
                <div className="font-bold text-lg">Other User</div>
                <div className="text-xs text-neutral-700">@other</div>
              </div>
              <div>
                <button className="rounded-full px-6 py-2 bg-white">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
