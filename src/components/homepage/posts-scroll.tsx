import { Recipe } from "@/src/types/tables";
import { useAuth } from "@/src/utils/hooks/auth-hook";
import { createClient } from "@/src/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "react-query";
import PostLoading from "./post-loading";
import PostSmall from "./post-small";

export default function PostScroll() {
  const router = useRouter();
  const supabase = createClient();

  const fetchData = async ({ pageParam = 0 }) => {
    const user = await useAuth(router);

    if (!user.user) {
      router.push("/signin");
      return;
    }

    const uuid = await supabase
      .from("users")
      .select("id")
      .eq("uuid", user.user.id)
      .single();

    if (uuid.error) {
      console.error("Error fetching data:", uuid.error.message);
      return;
    }

    const { error, data } = await supabase.functions.invoke<Recipe[]>(
      "generate-recommendation",
      {
        body: {
          id: uuid.data.id,
          cursor: pageParam,
        },
      },
    );

    if (error) {
      console.error("Error fetching data:", error.message);
      return {
        nextCursor: pageParam,
        error: error.message,
      };
    }

    return {
      ...data,
      nextCursor: pageParam + 1,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: "recipes",
      queryFn: fetchData,
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    });

  return (
    <div className="flex flex-col">
      {status === "loading" ? (
        <PostLoading />
      ) : (
        data?.pages.map((page, i) => (
          <div key={i}>
            <PostSmall {...page[0]} />
          </div>
        ))
      )}
      <button onClick={() => fetchNextPage()}>Load More</button>
    </div>
  );
}
