"use client";

import { Recipe, User } from "@/src/types/tables";
import { useAuth } from "@/src/utils/hooks/auth-hook";
import { createClient } from "@/src/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "react-query";
import PostLoading from "./post-loading";
import PostSmall from "./post-small";
import { useState } from "react";

export default function PostScroll() {
  const router = useRouter();
  const supabase = createClient();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchData = async ({
    pageParam = 0,
  }): Promise<{
    data?: Recipe[];
    nextCursor?: number;
  }> => {
    const user = await useAuth(router);

    if (!user.user) {
      router.push("/signin");
      return {};
    }

    const uuid = await supabase
      .from("users")
      .select("id")
      .eq("uuid", user.user.id)
      .single();

    if (uuid.error) {
      console.error("Error fetching data:", uuid.error.message);
      return {};
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
      };
    }

    return {
      nextCursor: pageParam + 3,
      data: data || [],
    };
  };

  const recipes = useInfiniteQuery({
    queryKey: "recipes",
    queryFn: fetchData,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  return (
    <div className="flex flex-col">
      {recipes.status === "loading" ? (
        <PostLoading />
      ) : (
        recipes.data?.pages.map((group, i) => {
          return (
            group.data &&
            group.data.map((recipe) => {
              return (
                <>
                  <PostSmall
                    key={recipe.id}
                    recipe={recipe}
                    user={currentUser}
                  />
                </>
              );
            })
          );
        })
      )}
      {recipes.isFetchingNextPage ? (
        <PostLoading />
      ) : (
        <button onClick={() => recipes.fetchNextPage()}>Load More</button>
      )}
    </div>
  );
}
