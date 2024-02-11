import { createClient } from "@/src/utils/supabase/client";
import Bottomnav from "@/src/components/bottom-navbar";
import PostSmall from "../components/homepage/post-small";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("recipes")
    .select()
    .order("id", { ascending: false });

  return (
    <div className="flex">
      <div className=" w-full h-screen flex flex-col items-center border-l border-r border-gray-300 overflow-scroll ">
        <div className="text-center font-bold">
          <div>Recommended</div>
        </div>
        <div className="py-2 border-gray-300">
          <div className="flex flex-col">
            {error && <p>Error fetching data from Supabase: {error.message}</p>}
            {data &&
              data.map((recipe, index) => (
                <div
                  key={index}
                  className="border-gray-300 border-t border-b p-2 flex space-x-4 mr-8"
                >
                  <PostSmall key={index} {...recipe} />
                </div>
              ))}
          </div>
          <Bottomnav />
        </div>
      </div>
    </div>
  );
}
