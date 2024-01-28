import { useEffect, useState } from "react";
import PostSmall from "./post-small";
import { createClient } from "@/src/utils/supabase/client";
import Bottomnav from "@/src/components/bottom-navbar";
import Sidebar from "./sidebar";
export default async function Timeline() {
  const supabase = createClient();
  const { data, error } = await supabase.from("recipes").select();

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-auto md:w-[70%]  h-screen flex-col border-l border-r border-gray-300 overflow-scroll ">
        <div className="grid grid-cols-2 text-center m-2 text-xl font-bold">
          <div>Following</div>
          <div>Recommended</div>
        </div>
        <div className="py-2 border-gray-300 items-center relative">
          <div className="flex flex-col">
            {error && <p>Error fetching data from Supabase: {error.message}</p>}
            {data &&
              data.map((recipe, index) => (
                <div
                  key={index}
                  className="border-gray-300 border-t border-b p-2 flex space-x-4 mr-8"
                >
                  <div>
                    <div className="w-full h-8 rounded-full"></div>
                  </div>
                  <div className="flex flex-col space-y-2 p-2">
                    <div className="flex items-center space-x-1"></div>
                    <PostSmall key={index} {...recipe} />
                  </div>
                </div>
              ))}
          </div>
          <Bottomnav />
        </div>
      </div>
    </div>
  );
}
