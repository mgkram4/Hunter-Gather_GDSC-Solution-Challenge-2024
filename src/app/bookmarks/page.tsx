import { createClient } from "@utils/supabase/server";
import PostSmall from "../homepage/post-small";
import { cookies, headers } from "next/headers";

export default async function Bookmarks() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await supabase.auth.getUser();
  const email = user?.data?.user?.email;
  const headerList = headers();

  // If the user is not signed in, prompt them to sign in
  if (!email) {
    return (
      <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8 text-center">
        <p>Please sign in to view your bookmarks.</p>
        {/* You can add a sign-in button or a link to the sign-in page here */}
        <a href="/signin" className="text-blue-500">
          Sign In
        </a>
      </div>
    );
  }

  // If the user is signed in, fetch and display the posts
  const { data, error } = await supabase
    .from("recipes")
    .select(
      "title, short_description, headliner_image, date_published, rating_count, users(profilePicture), bookmark_count, comment_count",
    );

  return (
    <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Bookmarks</h2>
      {error && (
        <p className="text-red-500">
          Error fetching data from Supabase: {error.message}
        </p>
      )}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
          {data.map((recipe, index) => (
            <div key={index} className="mb-4">
              <PostSmall key={index} {...recipe} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
