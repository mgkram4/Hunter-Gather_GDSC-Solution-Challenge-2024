import Carousel from "./swipecarousel";
import { CiBookmark } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { BiComment } from "react-icons/bi";
import { createClient } from "@/src/utils/supabase/client";

const slideUrls: string[] = [
  "/testfood.jpg",
  "/testfood.jpg",
  "/testfood.jpg",
  "/testfood.jpg",
];

export default async function PostSmall() {
  const supabase = createClient();
  const { data, error } = await supabase.from("recipes").select();

  return (
    <div className="h-full gap-4 m-4 flex flex-col shadow-xl w-full rounded-xl">
      {error && <p>Error fetching data from Supabase: {error.message}</p>}
      {data &&
        data.map((recipe, index) => (
          <div key={index} className="bg-white p-4 mb-4 rounded-md shadow-md">
            <div className="mt-4 px-2 font-bold">{recipe.title}</div>
            <div className="p-2">
              {recipe.short_description ||
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi eos, earum mollitia tenetur fuga veniam voluptatum quo, dolorem ipsam"}
            </div>

            <Carousel autoSlide={true} slides={slideUrls}>
              {slideUrls.map((url, index) => (
                <img key={index} src={url} alt={`slide-${index}`} />
              ))}
            </Carousel>

            <div className="flex flex-row ml-4">
              <div className="mt-4">User: Img</div>
              <div className="flex flex-col ml-4 mt-4">
                <div className="">User ID: {recipe.user_id}</div>
                <div className="text-sm">
                  {new Date(recipe.date_published).toDateString()}
                </div>
              </div>
              <div className="flex flex-row ml-auto space-x-4 m-4">
                <div className="">
                  {recipe.rating_count}
                  <CiHeart className="w-6 h-6" />
                </div>
                <div>
                  {recipe.bookmark_count} <CiBookmark className="w-6 h-6" />
                </div>
                <div>
                  {recipe.comment_count}
                  <BiComment className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
