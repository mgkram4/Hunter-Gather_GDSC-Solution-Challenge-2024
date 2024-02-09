import { CiBookmark } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { BiComment } from "react-icons/bi";
import { createClient } from "@/src/utils/supabase/client";
import BookmarkButton from "../bookmarks/bookmark-button";

interface BookmarkButtonProps {
  recipeId: number;
}

export default async function PostSmall() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("recipes")
    .select(
      "id,title, short_description, headliner_image, date_published, rating_count, users(profilePicture,id,uuid),bookmark_count,comment_count, user_id",
    );

  return (
    <div className="m-4 ">
      {error && <p>Error fetching data from Supabase: {error.message}</p>}
      {data &&
        data.map((recipe, index) => (
          <div
            key={index}
            className="bg-white p-4 mb-4 rounded-md shadow-md border-2 border-gray-200 "
          >
            <div className="font-bold text-xl mb-2">{recipe.title}</div>
            <div className="text-gray-600 mb-4">
              {recipe.short_description || ""}
            </div>

            <img
              key={index}
              src={
                recipe.headliner_image !== null
                  ? recipe.headliner_image
                  : undefined
              }
              className="w-full h-32 object-cover rounded-md mb-2"
            />

            <div className="flex items-center justify-between  mt-4">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-semibold">
                  User: <img>{recipe.users?.profilePicture}</img>
                </div>
                <div className="text-sm text-gray-500">
                  Profile Picture: {recipe.users?.profilePicture}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(recipe.date_published).toLocaleDateString()}
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex items-center space-x-1">
                  <span className="text-sm">{recipe.rating_count}</span>
                  <CiHeart className="w-6 h-6 hover:text-red-500 active:bg-red-300 active:text-white rounded cursor-pointer transition-all duration-300" />
                </div>

                <div className="flex items-center space-x-1">
                  <span className="text-sm">{recipe.bookmark_count}</span>
                  <CiBookmark className="w-6 h-6 hover:text-blue-500 active:bg-blue-300 active:text-white rounded cursor-pointer transition-all duration-300" />
                  <BookmarkButton recipeId={recipe.id} />
                </div>

                <div className="flex items-center space-x-1">
                  <span className="text-sm">{recipe.comment_count}</span>
                  <BiComment className="w-6 h-6 hover:text-green-500 active:bg-green-300 active:text-white rounded cursor-pointer transition-all duration-300" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
