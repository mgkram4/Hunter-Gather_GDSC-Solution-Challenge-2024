import React, { useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { createClient } from "@/src/utils/supabase/client";

export function BookmarkButton({}) {
  const supabase = createClient();
  const [isBookmarked, setIsBookmarked] = useState(false);

  function handleBookmarkClick() {
    // Toggle the bookmark status
    setIsBookmarked(!isBookmarked);

    // Here, you should add logic to update the bookmark table for the current user
    // and the given recipeId. This is just a placeholder, you need to modify it according to your Supabase schema.
    supabase
      .from("bookmarks")
      .select("")
      .then(({ data, error }) => {
        if (error) {
          console.error("Error updating bookmarks:", error.message);
        }
      });
  }

  return (
    <div className="flex items-center space-x-1">
      <span className="text-sm">{/* Display bookmark count here */}</span>
      <CiBookmark
        className={`w-6 h-6 hover:text-blue-500 active:bg-blue-300 active:text-white rounded cursor-pointer transition-all duration-300 ${
          isBookmarked && "text-blue-500"
        }`}
        onClick={handleBookmarkClick}
      />
    </div>
  );
}
