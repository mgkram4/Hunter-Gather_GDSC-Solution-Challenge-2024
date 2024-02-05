import React, { useState, useEffect } from "react";
import { createClient } from "@/src/utils/supabase/client";
import { useAuth } from "@/src/utils/hooks/auth-hook";
import { useRouter } from "next/navigation";
import { string } from "yup";

export default function BookmarkButton() {
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const supabase = createClient();
  const router = useRouter();
  const user = useAuth(router);

  async function fetchData() {
    try {
      if (user) {
        const { data, error } = await supabase
          .from("recipes")
          .select("bookmark_count")
          .eq("user_id", user)
          .single();

        if (data) {
          setBookmarkCount(data.bookmark_count || 0);
          setIsBookmarked(data.bookmark_count > 0);
        } else {
          console.error("Error fetching bookmark status:", error);
        }
      }
    } catch (error) {
      console.error("Error fetching bookmark status:", error);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [user]);

  async function toggleBookmark() {
    try {
      if (user) {
        const { data, error } = await supabase.from("recipes").upsert(
          [
            {
              user_id: user,
              // Add other necessary fields...
              date_published: string, // Add your actual date_published value
              title: string, // Add your actual title value
              bookmark_count: isBookmarked
                ? bookmarkCount - 1
                : bookmarkCount + 1,
            },
          ],
          { onConflict: ["user_id"], ignoreDuplicates: true },
        );

        if (data) {
          // Update the state based on the latest value
          setBookmarkCount((prevCount) =>
            isBookmarked ? prevCount - 1 : prevCount + 1,
          );
          setIsBookmarked(!isBookmarked);
        } else {
          console.error("Error toggling bookmark:", error);
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  }

  return (
    <div>
      <p>Bookmark Count: {bookmarkCount}</p>
      <button onClick={toggleBookmark}>
        {isBookmarked ? "Unbookmark" : "Bookmark"}
      </button>
    </div>
  );
}
