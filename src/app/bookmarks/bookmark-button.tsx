"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/src/utils/supabase/client";
import { useAuth } from "@/src/utils/hooks/auth-hook";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/config/routes";
import { ERROR_RESPONSES } from "@/src/utils/helpers/auth/enums";
import { useToggle } from "react-use";
import { CiBookmark } from "react-icons/ci";
import { Bookmarks } from "@/src/types/tables";

interface BookmarkButtonProps {
  initialBookmarkCount: number;
  recipeId: number;
}

export default function BookmarkButton({
  initialBookmarkCount,
  recipeId,
}: BookmarkButtonProps) {
  const [bookmarkCount, setBookmarkCount] =
    useState<number>(initialBookmarkCount);
  const [isBookmarked, toggleBookmarked] = useToggle(false);
  const [userId, setUserId] = useState<number>();
  const [recipeIds, setRecipeIds] = useState<number[]>([]);

  const supabase = createClient();
  const router = useRouter();

  const fetchBookmarkData = async () => {
    const user = await useAuth(router);

    if (!user.user) {
      router.push(`${ROUTES.SIGNIN}?error=${ERROR_RESPONSES.AUTH_REQUIRED}`);
      return;
    }

    const uuid = await supabase
      .from("users")
      .select("id")
      .eq("uuid", user.user.id)
      .single();

    if (!uuid.data) {
      throw new Error("User not found");
    }

    setUserId(uuid.data.id);

    const bookmarks = await supabase
      .from("bookmarks")
      .select()
      .eq("user_id", uuid.data.id)
      .single();

    setRecipeIds(bookmarks.data?.recipe_ids || []);

    if (bookmarks.data && bookmarks.data.recipe_ids) {
      toggleBookmarked(bookmarks.data.recipe_ids.includes(recipeId));
    }
  };

  const handleClick = async () => {
    toggleBookmarked();
    let newCount = bookmarkCount;

    if (isBookmarked) {
      setBookmarkCount(bookmarkCount - 1);
      newCount = bookmarkCount - 1;
    } else {
      setBookmarkCount(bookmarkCount + 1);
      newCount = bookmarkCount + 1;
    }

    // Update the bookmark count in the database
    const updateCount = await supabase
      .from("recipes")
      .update({ bookmark_count: newCount })
      .eq("id", recipeId);

    // add the recipe to the user's bookmarks
    if (newCount > initialBookmarkCount && userId) {
      const updateBookmarks = await supabase
        .from("bookmarks")
        .update({
          recipe_ids: [...recipeIds, recipeId],
        })
        .eq("user_id", userId);
    } else if (userId) {
      const updateBookmarks = await supabase
        .from("bookmarks")
        .update({
          recipe_ids: recipeIds.filter((id) => id !== recipeId),
        })
        .eq("user_id", userId);
    }

    if (updateCount.error) {
      console.error(
        "Error updating bookmark count:",
        updateCount.error.message,
      );
    }
  };

  useEffect(() => {
    fetchBookmarkData();
  }, []);

  return (
    userId && (
      <div className="inline-flex">
        <button
          className={`w-6 h-6 hover:text-blue-500  ${
            isBookmarked && "text-blue-500"
          } rounded cursor-pointer transition-all duration-300`}
          onClick={handleClick}
        >
          <CiBookmark className="w-6 h-6 hover:text-blue-500 active:bg-blue-300 active:text-white rounded cursor-pointer transition-all duration-300" />
        </button>
        <p>{bookmarkCount}</p>
      </div>
    )
  );
}
