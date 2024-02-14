"use client";

import Bottomnav from "@/src/components/bottom-navbar";
import PostScroll from "../components/homepage/posts-scroll";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <div className="flex">
      <div className=" w-full h-screen flex flex-col items-center border-l border-r border-gray-300 overflow-scroll ">
        <div className="text-center font-bold">
          <div>Recommended</div>
        </div>
        <div className="py-2 border-gray-300">
          <QueryClientProvider client={queryClient}>
            <PostScroll />
          </QueryClientProvider>
          <Bottomnav />
        </div>
      </div>
    </div>
  );
}
