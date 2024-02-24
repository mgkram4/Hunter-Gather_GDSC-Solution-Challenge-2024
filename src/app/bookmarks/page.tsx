"use client";

import React, { useEffect, useState } from "react";
import PostSmall from "@components/homepage/post-small";
import { useAuth } from "@/src/utils/hooks/auth-hook";
import { ROUTES } from "@/src/config/routes";
import { useRouter } from "next/navigation";
import { ERROR_RESPONSES } from "@/src/utils/helpers/auth/enums";
import { createClient } from "@/src/utils/supabase/client";
import { Recipe, User } from "@/src/types/tables";

export default function Bookmarks() {
  const router = useRouter();
  const supabase = createClient();
  const [bookmarks, setBookmarks] = useState<Recipe[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function fetchData() {
    try {
      const user = await useAuth(router);

      if (!user.user) {
        router.push(`${ROUTES.SIGNIN}?error=${ERROR_RESPONSES.AUTH_REQUIRED}`);
        return;
      }

      // fetch the true user id

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("uuid", user.user.id)
        .single();
      setCurrentUser(userData as User);

      const { data: bookmarksData, error: bookmarksError } = await supabase
        .from("bookmarks")
        .select("recipe_ids")
        .eq("user_id", userData.id)
        .single();

      const { data: recipeData, error: recipeError } = await supabase
        .from("recipes")
        .select("*")
        .in("id", bookmarksData.recipe_ids);

      setBookmarks(recipeData || []);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Bookmarks</h2>
      {bookmarks.map((bookmark) => (
        <PostSmall key={bookmark.id} recipe={bookmark} user={currentUser} />
      ))}
    </div>
  );
}
