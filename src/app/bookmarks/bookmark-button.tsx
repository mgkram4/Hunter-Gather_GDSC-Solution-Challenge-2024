"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/src/utils/supabase/client";
import { useAuth } from "@/src/utils/hooks/auth-hook";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/config/routes";
import { ERROR_RESPONSES } from "@/src/utils/helpers/auth/enums";

interface RecipeData {
  bookmark_count?: number;
  user_id?: number;
  id?: number;
  title?: string;
  date_published?: string;
  // Add other properties from your Supabase schema as needed
}

interface BookmarkButtonProps {
  recipeId: number;
}

export default function BookmarkButton({ recipeId }: BookmarkButtonProps) {
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await useAuth(router);

        if (!user.user) {
          router.push(
            `${ROUTES.SIGNIN}?error=${ERROR_RESPONSES.AUTH_REQUIRED}`,
          );
          return;
        }

        const { error, data } = await supabase
          .from("users")
          .select("id")
          .eq("uuid", user.user.id!);

        if (error) {
          console.error("Error fetching data:", error);
        } else if (data && data.length > 0) {
          setUserId(data[0].id);
        }

        // Fetch the specific recipe data
        const { data: currentRecipeData, error: fetchError } = await supabase
          .from("recipes")
          .select("bookmark_count, user_id, id, title, date_published")
          .eq("id", recipeId)
          .single();

        if (fetchError) {
          console.error("Error fetching recipe data:", fetchError);
          return;
        }

        // Ensure that isBookmarked is initially set to false
        setIsBookmarked(false);

        // Set the bookmark count based on fetched data
        setBookmarkCount(currentRecipeData?.bookmark_count || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, recipeId]);

  async function toggleBookmark() {
    try {
      const user = await useAuth(router);

      if (!user.user) {
        router.push(`${ROUTES.SIGNIN}?error=${ERROR_RESPONSES.AUTH_REQUIRED}`);
        return;
      }

      const { data: currentRecipeData, error: fetchError } = await supabase
        .from("recipes")
        .select("date_published, title, user_id, bookmark_count, id")
        .eq("id", recipeId)
        .single();

      if (fetchError || !currentRecipeData) {
        console.error("Error fetching recipe data:", fetchError);
        return;
      }

      // Use the userId directly from the fetched recipe data
      const userId = currentRecipeData.user_id;

      // Calculate the new bookmark count
      const newBookmarkCount = isBookmarked
        ? currentRecipeData.bookmark_count - 1
        : currentRecipeData.bookmark_count + 1;

      // Perform the actual update in Supabase
      const { data, error } = await supabase
        .from("recipes")
        .update({
          bookmark_count: newBookmarkCount,
        })
        .eq("id", recipeId)
        .eq("user_id", userId);

      console.log("Update data:", data);
      console.log("Update error:", error);

      if (error) {
        // If the update in Supabase fails, log the error
        console.error("Error toggling bookmark:", error);
      } else {
        // Update the local state only after the Supabase update succeeds
        setBookmarkCount(newBookmarkCount);
        setIsBookmarked(!isBookmarked);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  }

  return (
    <div>
      <p>Bookmark Count: {bookmarkCount}</p>
      <button
        className="w-6 h-6 hover:text-blue-500 active:bg-blue-300 active:text-white rounded cursor-pointer transition-all duration-300"
        onClick={toggleBookmark}
      >
        {isBookmarked ? "Unbookmark" : "Bookmark"}
      </button>
    </div>
  );
}
