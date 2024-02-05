import { createClient } from "@utils/supabase/server";
import PostSmall from "../homepage/post-small";
import { cookies } from "next/headers";
import { useAuth } from "@/src/utils/hooks/auth-hook";
import { ROUTES } from "@/src/config/routes";
import { useRouter } from "next/navigation";

export default async function Bookmarks() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const router = useRouter();
  const user = useAuth(router);

  if (!user) {
    return (
      <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 text-center">
        <p>Please sign in to view your bookmarks.</p>
        <a href={ROUTES.SIGNIN} className="text-blue-500">
          Sign In
        </a>
      </div>
    );
  }

  // Fetch user ID based on email
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("email", user)
    .single();
  console.log("Supabase User Data:", userData);
  console.error("Supabase User Error:", userError);

  if (userError) {
    return (
      <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-red-500">
          Error fetching user data from Supabase: {userError.message}
        </p>
      </div>
    );
  }

  const userId = userData?.id;

  // Fetch all the recipe_ids a user has bookmarked
  const { data: bookmarksData, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("recipe_ids")
    .eq("user_id", userId);

  if (bookmarksError) {
    return (
      <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-red-500">
          Error fetching bookmarks data from Supabase: {bookmarksError.message}
        </p>
      </div>
    );
  }

  // Extracting recipe_ids from bookmarks data
  const recipeIds = bookmarksData[0]?.recipe_ids || [];

  // Fetch the details of the bookmarked recipes
  const { data: recipesData, error: recipesError } = await supabase
    .from("recipes")
    .select(
      "id, title, short_description, headliner_image, date_published, created_at, updated_at, taste_profile_id, ingredientsId, commentId, bookmark_count, comment_count, rating_count, instructions, embeddings, ratings_id",
    )
    .in("id", recipeIds);

  if (recipesError) {
    return (
      <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-red-500">
          Error fetching recipe data from Supabase: {recipesError.message}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Bookmarks</h2>
      {recipesData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
          {recipesData.map((recipe) => (
            <div key={recipe.id} className="mb-4">
              <PostSmall key={recipe.id} {...recipe} />
              {recipe.bookmark_count > 0 && (
                <div className="text-green-500 font-bold mt-2">Bookmarked</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
