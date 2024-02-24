"use client";
import BookmarkButton from "@/src/components/button/bookmark-button";
import { Recipe } from "@/src/types/tables";
import { User } from "@/src/types/tables";
import RatingButton from "../button/rating-button";
import Link from "next/link";

interface UserProps {
  user: User;
}

interface PostSmallProps {
  recipe: Recipe;
}
export default function PostSmall({
  recipe,
  user,
}: PostSmallProps & UserProps) {
  return (
    <div className="m-4 max-w-xl mx-auto rounded-md shadow-md border-2 border-gray-200 focus:outline-none focus:ring border-3 hover:border-slate-300 hover:shadow-xl">
      {recipe && (
        <Link href={`/recipe/${recipe.id}/page`}>
          {/* Link wraps the entire recipe card */}

          <div className="bg-white">
            <div className="bg-slate-50 p-4 border-b border-slate-200">
              <div className="font-bold text-xl mb-2">{recipe.title}</div>
              <div className="text-gray-600 mb-1">
                {recipe.short_description || ""}
              </div>
            </div>

            <div className="flex justify-center items-center h-64 sm:h-72 md:h-96">
              <img
                src={
                  recipe.headliner_image !== null
                    ? recipe.headliner_image
                    : undefined
                }
                className="w-full h-full rounded-sm object-cover sm:w-full md:w-full xl:w-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                alt="Recipe Headliner"
              />
            </div>

            <div className="border-t bg-slate-50 p-4 border-slate-200">
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-1 sm:space-x-4">
                  {user?.profilePicture && (
                    <img
                      className="w-16 h-16  rounded-xl border-2 border-slate-200"
                      src={user?.profilePicture}
                      alt="Profile"
                    />
                  )}
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold text-gray-700 mb-1">
                      {user?.firstName}
                    </div>
                    <div className="text-md text-gray-500 mb-2">
                      @{user?.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(recipe.date_published).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex mt-2 sm:mt-0 space-x-4 items-center">
                  <div className="flex items-center space-x-1">
                    <RatingButton
                      initialRatingCount={recipe.rating_count}
                      recipeId={recipe.id}
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookmarkButton
                      initialBookmarkCount={recipe.bookmark_count}
                      recipeId={recipe.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
