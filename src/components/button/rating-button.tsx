"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/src/utils/supabase/client";
import { useAuth } from "@/src/utils/hooks/auth-hook";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/config/routes";
import { ERROR_RESPONSES } from "@/src/utils/helpers/auth/enums";
import { useToggle } from "react-use";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface RatingButtonProps {
  initialRatingCount: number;
  recipeId: number;
}

export default function RatingButton({
  initialRatingCount,
  recipeId,
}: RatingButtonProps) {
  const [ratingCount, setRatingCount] = useState<number>(initialRatingCount);
  const [isRated, toggleRated] = useToggle(false);
  const [userId, setUserId] = useState<number>();
  const [recipeIds, setRecipeIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const supabase = createClient();
  const router = useRouter();

  const fetchRatingData = async () => {
    setIsLoading(true);

    try {
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

      const ratings = await supabase
        .from("rating")
        .select()
        .eq("user_id", uuid.data.id)
        .single();

      setRecipeIds(ratings.data?.recipe_ids || []);

      if (ratings.data && ratings.data.recipe_ids) {
        toggleRated(ratings.data.recipe_ids.includes(recipeId));
      }
    } catch (error: any) {
      console.error("Error fetching rating data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    setIsLoading(true);

    try {
      toggleRated();
      let newCount = ratingCount;

      if (isRated) {
        setRatingCount(ratingCount - 1);
        newCount = ratingCount - 1;
      } else {
        setRatingCount(ratingCount + 1);
        newCount = ratingCount + 1;
      }

      // Update the rating count in the database
      const updateCount = await supabase
        .from("recipes")
        .update({ bookmark_count: newCount })
        .eq("id", recipeId);

      // add the recipe to the user's bookmarks
      if (newCount > initialRatingCount && userId) {
        const updateRating = await supabase
          .from("rating")
          .update({
            recipe_ids: [...recipeIds, recipeId],
          })
          .eq("user_id", userId);
      } else if (userId) {
        const updateBookmarks = await supabase
          .from("rating")
          .update({
            recipe_ids: recipeIds.filter((id) => id !== recipeId),
          })
          .eq("user_id", userId);
      }

      if (updateCount.error) {
        console.error(
          "Error updating rating count:",
          updateCount.error.message,
        );
      }
    } catch (error: any) {
      console.error("Error handling click:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRatingData();
  }, []);

  return (
    userId && (
      <div className="inline-flex">
        <button
          className={`w-6 h-6 hover:text-red-500  ${
            isRated && "text-red-500"
          } rounded cursor-pointer transition-all duration-300`}
          onClick={handleClick}
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? (
            "Loading..."
          ) : isRated ? (
            <AiFillHeart className="w-6 h-6" />
          ) : (
            <AiOutlineHeart className="w-6 h-6" />
          )}
        </button>
        <p>{ratingCount}</p>
      </div>
    )
  );
}
