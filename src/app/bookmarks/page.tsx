"use client";

import React, { useEffect } from "react";
import PostSmall from "../homepage/post-small";
import { useAuth } from "@/src/utils/hooks/auth-hook";
import { ROUTES } from "@/src/config/routes";
import { useRouter } from "next/navigation";
import { ERROR_RESPONSES } from "@/src/utils/helpers/auth/enums";
import { createClient } from "@/src/utils/supabase/client";

export default function Bookmarks() {
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

        const { data, error } = await createClient()
          .from("recipes")
          .select("id, bookmark_count")
          .eq("user_id", user.user.id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        const recipeIds = data && data.id ? [data.id] : [];

        // Fetch detailed recipe data based on IDs
        const { data: detailedRecipesData, error: detailedRecipesError } =
          await createClient().from("recipes").select().in("id", recipeIds);

        if (detailedRecipesError) {
          throw new Error(detailedRecipesError.message);
        }

        // Render PostSmall components directly without saving to state
        if (detailedRecipesData.length > 0) {
          detailedRecipesData.forEach((recipe) => {
            console.log(recipe);
            // You can render PostSmall here with each 'recipe' data
          });
        }
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, [router]);

  return (
    <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Bookmarks</h2>
      <PostSmall />
    </div>
  );
}
