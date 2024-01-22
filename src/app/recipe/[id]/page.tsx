"use client";

import { createClient } from "@/src/utils/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaRegStar, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { TbShoppingCartPlus, TbShoppingCartCopy } from "react-icons/tb";

export default function Recipe() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [profilePic, setProfilePic] = useState();
  const [username, setUsername] = useState<string | null | undefined>();
  const [handle, setHandle] = useState<string | undefined>();
  //pull bookmarked from user
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | null | undefined>();
  const [datePublished, setDatePublished] = useState<string | undefined>();
  const [dateUpdated, setDateUpdated] = useState<string | undefined>();
  const [rating, setRating] = useState<number | undefined>();
  const [ratingCount, setRatingCount] = useState<number | undefined>();
  const [commentCount, setCommentCount] = useState<number | undefined>();
  const [bookmarkCount, setBookmarkCount] = useState<number | undefined>();
  const [prep, setPrep] = useState<JSON | undefined>();
  const [ingredients, setIngredients] = useState<JSON | undefined>();
  const [sweetness, setSweetness] = useState<number | undefined>();
  const [saltiness, setSaltiness] = useState<number | undefined>();
  const [sourness, setSourness] = useState<number | undefined>();
  const [bitterness, setBitterness] = useState<number | undefined>();
  const [savoriness, setSavoriness] = useState<number | undefined>();
  const [spiciness, setSpiciness] = useState<number | undefined>();
  const [cartState, setCartState] = useState<{ [key: string]: boolean }>({});

  const supabase = createClient();

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleAddCart = (ingredient) => {
    setCartState((prevStates) => ({
      ...prevStates,
      [ingredient]: !prevStates[ingredient],
    }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const recipe = await supabase
          .from("recipes")
          .select()
          .match({ id })
          .single();
        const { error, data } = await supabase
          .from("users")
          .select()
          .eq("id", recipe.data!.user_id)
          .single();
        if (error) {
          console.log(error);
        }
        setUsername(data?.firstName + " " + data?.lastName);
        setHandle(data?.email);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRecipe = async () => {
      try {
        const { error, data } = await supabase
          .from("recipes")
          .select()
          .match({ id })
          .single();
        if (error) {
          console.log(error);
        }
        setTitle(data?.title);
        setDescription(data?.short_description);
        setDatePublished(format(new Date(data!.date_published), "MMM d, yyyy"));
        setDateUpdated(format(new Date(data!.updated_at), "MMM d, yyyy"));
        setRatingCount(data?.rating_count);
        setCommentCount(data?.comment_count);
        setBookmarkCount(data?.bookmark_count);
        setPrep(data?.instructions as JSON | undefined);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRatings = async () => {
      try {
        const recipe = await supabase
          .from("recipes")
          .select()
          .match({ id })
          .single();
        const { error, data } = await supabase
          .from("ratings")
          .select()
          .eq("recipe_id", recipe.data!.id);
        if (error) {
          console.log(error);
        }
        const ratings = data?.map((entry) => entry.rating) || [];
        setRating(
          ratings.length > 0
            ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
            : undefined,
        );
      } catch (error) {
        console.log(error);
      }
    };

    const fetchIngredients = async () => {
      try {
        const recipe = await supabase
          .from("recipes")
          .select()
          .match({ id })
          .single();
        const { error, data } = await supabase
          .from("ingredients")
          .select()
          .eq("recipe_id", recipe.data!.id)
          .single();
        if (error) {
          console.log(error);
        }
        setIngredients(data?.items as JSON | undefined);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTasteProfile = async () => {
      try {
        const recipe = await supabase
          .from("recipes")
          .select()
          .match({ id })
          .single();
        const { error, data } = await supabase
          .from("recipe_taste_profiles")
          .select()
          .eq("id", recipe.data!.id)
          .single();
        if (error) {
          console.log(error);
        }
        setSweetness(data!.sweetness * 100);
        setSaltiness(data!.saltiness * 100);
        setSourness(data!.sourness * 100);
        setBitterness(data!.bitterness * 100);
        setSavoriness(data!.savoriness * 100);
        setSpiciness(data!.spiciness * 100);
        console.log(sweetness);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
    fetchRecipe();
    fetchRatings();
    fetchIngredients();
    fetchTasteProfile();
  }, [id]);

  const TasteBar = ({ percentage }) => {
    return (
      <div className="relative h-6 w-full rounded-xl mb-1 bg-gray-400">
        <div
          className="absolute h-full rounded-xl bg-gradient-to-r from-green-400 to-green-600"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-gray-200">
      <div className="flex w-full h-[540px] p-4">
        <div className="flex flex-col w-1/4 items-center">
          <div className="flex space-x-3 mt-2 mb-6 items-center">
            <button className="w-20 h-20 rounded-full bg-gray-100">pfp</button>
            <div className="mt-1">
              <p className="text-xl">{username}</p>
              <p className="text-sm">@{handle}</p>
            </div>
          </div>

          <div className="w-3/5 h-full">
            <p className="text-center text-2xl font-bold underline mb-1">
              Taste Profile
            </p>
            {sweetness !== 0 && (
              <div>
                <p className="text-lg font-bold">Sweet</p>
                <TasteBar percentage={sweetness} />
              </div>
            )}
            {saltiness !== 0 && (
              <div>
                <p className="text-lg font-bold">Salty</p>
                <TasteBar percentage={saltiness} />
              </div>
            )}
            {sourness !== 0 && (
              <div>
                <p className="text-lg font-bold">Sour</p>
                <TasteBar percentage={sourness} />
              </div>
            )}
            {bitterness !== 0 && (
              <div>
                <p className="text-lg font-bold">Bitter</p>
                <TasteBar percentage={bitterness} />
              </div>
            )}
            {savoriness !== 0 && (
              <div>
                <p className="text-lg font-bold">Savory</p>
                <TasteBar percentage={savoriness} />
              </div>
            )}
            {spiciness !== 0 && (
              <div>
                <p className="text-lg font-bold">Spicy</p>
                <TasteBar percentage={spiciness} />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex">
            <div className="w-3/5 h-full mb-6">
              <div className="flex text-center">
                <p className="text-5xl font-bold mr-4">{title}</p>
                <button className="text-4xl" onClick={handleBookmarkClick}>
                  {isBookmarked ? (
                    <BsFillBookmarkCheckFill />
                  ) : (
                    <BsBookmarkPlus />
                  )}
                </button>
              </div>
              {description && <p className="text-xl my-2">{description}</p>}
              <p className="text-sm mb-2">
                Posted: {datePublished} &nbsp;&nbsp;&nbsp;&nbsp; Last Updated:{" "}
                {dateUpdated}
              </p>
              <div className="flex">
                <div className="flex w-auto h-8 pr-2 text-xl space-x-0.5">
                  <a href="#ratings">
                    <FaRegStar className="text-3xl" />
                  </a>
                  <p>{ratingCount}</p>
                </div>
                <div className="flex w-auto h-8 pr-2 text-xl space-x-0.5">
                  <a href="#reviews">
                    <FaRegComment className="text-3xl" />
                  </a>
                  <p>{commentCount}</p>
                </div>
                <div className="flex w-auto h-8 pr-2 text-xl">
                  <FaRegBookmark className="text-3xl" />
                  <p>{bookmarkCount}</p>
                </div>
                <div className="flex w-8 h-8 mr-4">
                  <button>
                    <FaRegShareFromSquare className="text-3xl" />
                  </button>
                </div>
                <a
                  href="#add-review"
                  className="flex w-auto h-8 rounded-lg p-2 items-center text-center bg-green-600"
                >
                  Add a review
                </a>
              </div>
            </div>

            <div className="flex w-1/5 h-full justify-end items-center">
              <div
                className={`flex w-1/2 h-5/6 rounded-full mb-6 justify-center items-center font-bold ${rating !== undefined && rating >= 85 ? "bg-green-600 text-6xl" : rating !== undefined && rating >= 70 ? "bg-yellow-500 text-6xl" : rating !== undefined ? "bg-red-600 text-6xl" : "bg-gray-400 text-xl"}`}
              >
                {rating !== undefined ? rating : "No Ratings"}
              </div>
            </div>
          </div>

          <div className="flex w-5/6 h-full pb-6">
            <div className="flex h-full mr-2 justify-center items-center text-3xl">
              <button>&lt;</button>
            </div>
            <div className="flex space-x-12 w-full h-full mx-2 justify-center">
              <div className="w-[300px] h-[300px] rounded-xl bg-white">
                <img src="" alt="" />
              </div>
              <div className="w-[300px] h-[300px] rounded-xl bg-white">
                <img src="" alt="" />
              </div>
              <div className="w-[300px] h-[300px] rounded-xl bg-white">
                <img src="" alt="" />
              </div>
              <div className="w-[300px] h-[300px] rounded-xl bg-white">
                <img src="" alt="" />
              </div>
            </div>
            <div className="flex h-full ml-2 justify-center items-center text-3xl">
              <button>&gt;</button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-0.5 bg-black"></div>

      <div className="flex justify-center space-x-48 w-full h-1/2 mt-10 pb-10 bg-gray-200">
        <div className="w-1/4 h-[35rem] rounded-xl p-4 ml-32 bg-white">
          <p className="mb-4 text-center text-3xl underline font-bold">
            Ingredients
          </p>
          {ingredients &&
            Object.entries(ingredients).map(([ingredient, quantity], index) => (
              <div className="flex">
                <button
                  className="flex w-8 h-8 mb-2 ml-7 rounded-md justify-center items-center text-2xl bg-green-600"
                  onClick={() => handleAddCart(ingredient)}
                >
                  {cartState[ingredient] ? (
                    <TbShoppingCartCopy />
                  ) : (
                    <TbShoppingCartPlus />
                  )}
                </button>
                <p key={ingredient} className="text-xl mb-2 ml-2">
                  {`${ingredient}: ${quantity}`}
                </p>
              </div>
            ))}
        </div>
        <div className="w-1/4 h-[35rem] rounded-xl p-4 bg-white">
          <p className="mb-4 text-center text-3xl underline font-bold">
            Preparation
          </p>
          {prep &&
            Object.entries(prep).map(([step, instruction], index) => (
              <p key={step} className="ml-8 text-xl mb-2">
                {`${index + 1}. ${instruction}`}
              </p>
            ))}
        </div>
      </div>

      <div className="w-full h-0.5 bg-black"></div>

      <div className="w-full h-full bg-gray-200"></div>
    </div>
  );
}