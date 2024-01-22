export default function timeline() {
  return (
    <div className="ml-auto md:w-[70%]   h-full min-h-screen flex-col border-l border-r border-gray-600">
      <div className="grid grid-cols-2 text-center">
        <div className="">Following</div>
        <div>Recommended</div>
      </div>
      <div className="py-2  border-gray-600  items-center relative">
        <div className="flex flex-col">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="border-gray-600 border-t  border-b p-2 flex space-x-4 "
            >
              <div>
                <div className="w-full h-10 bg-slate rounded-full"></div>
              </div>
              <div className="flex flex-col space-y-2 p-2  ">
                <div className="flex items-center space-x-1">
                  <div>UserName</div>
                  <div>@user</div>

                  <div>1 hour ago</div>
                </div>
                <div className="text-base">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nesciunt laboriosam harum amet sunt quam reprehenderit quos,
                  dolores, facilis, perferendis reiciendis dignissimos fuga.
                  Aspernatur at, voluptate excepturi consectetur est ab officia?
                </div>
                <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
