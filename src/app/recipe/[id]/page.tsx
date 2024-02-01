"use client";

import { createClient } from "@/src/utils/supabase/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FaRegStar, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { TbShoppingCartPlus, TbShoppingCartCopy } from "react-icons/tb";
import CircleSlider from "@/src/components/circle_slider";

export default function Recipe() {
  const supabase = createClient();
  const params = useParams<{ id: string }>();
  const [userId, setUserId] = useState<number | null>(null);
  const recipeId = params.id;
  const [profilePicOP, setProfilePicOP] = useState();
  const [usernameOP, setUsernameOP] = useState<string | null | undefined>();
  const [handle, setHandle] = useState<string | undefined>();
  const [profilePic, setProfilePic] = useState();
  const [username, setUsername] = useState<string | null | undefined>();
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
  const [comments, setComments] = useState<
    { comment: string; usernameComment: string }[]
  >([]);
  const [newComment, setNewComment] = useState<{
    comment: string;
    usernameComment: string;
  }>();
  const [newCommentText, setNewCommentText] = useState<string | undefined>();
  const [commented, setCommented] = useState(false);
  //pull rating from user
  const [rated, setRated] = useState(false);
  const [sliderValue, setSliderValue] = React.useState(0);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { error: idError, data: idData } = await supabase.auth.getUser();
        if (idError) {
          console.error(idError);
          return;
        }
        setUserId(Number(idData.user.id));

        const { error: userError, data: userData } = await supabase
          .from("users")
          .select()
          .eq("id", Number(userId))
          .single();
        setUsername(userData?.firstName + " " + userData?.lastName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleBookmarkClick = async () => {
    try {
      const { error: fetchError, data } = await supabase
        .from("bookmarks")
        .select()
        .eq("user_id", Number(userId))
        .single();
      if (fetchError) {
        console.log(fetchError);
      }
      const bookmarkedIds = data?.recipe_ids || [];

      if (!bookmarkedIds.includes(Number(recipeId))) {
        bookmarkedIds.push(Number(recipeId));
        const { error: updateError } = await supabase
          .from("bookmarks")
          .update({ recipe_ids: bookmarkedIds })
          .eq("user_id", Number(userId));
        if (updateError) {
          console.error(updateError);
        }
      } else {
        const removedId = bookmarkedIds.filter((id) => id !== Number(recipeId));
        const { error: updateError } = await supabase
          .from("bookmarks")
          .update({ recipe_ids: removedId })
          .eq("user_id", Number(userId));
        if (updateError) {
          console.error(updateError);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleAddCart = (ingredient) => {
    setCartState((prevStates) => ({
      ...prevStates,
      [ingredient]: !prevStates[ingredient],
    }));
    //add to cart
  };

  const handleAddComment = async () => {
    if (newCommentText && newCommentText?.trim() !== "") {
      const newUserComment = {
        usernameComment: usernameOP || "",
        comment: newCommentText || "",
        posted: formatDistanceToNow(new Date(), { addSuffix: true }),
      };
      setComments([newUserComment, ...comments]);
      setNewComment(newUserComment);
      setNewCommentText("");
      setCommented(true);

      try {
        const { error: insertError } = await supabase
          .from("comments")
          .insert({
            user_id: Number(userId),
            recipe_id: Number(recipeId),
            comment: newUserComment.comment,
          });
        if (insertError) {
          console.log(insertError);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRating = async () => {
    try {
      const { error: insertError } = await supabase
        .from("ratings")
        .insert({
          user_id: Number(userId),
          recipe_id: Number(recipeId),
          rating: sliderValue,
        });
      if (insertError) {
        console.log(insertError);
      }
    } catch (error) {
      console.log(error);
    }
    setRated(true);
  };

  const handleSliderChange = (newValue) => {
    setSliderValue(Math.round(newValue));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const recipe = await supabase
          .from("recipes")
          .select()
          .eq("id", recipeId)
          .single();
        const { error, data } = await supabase
          .from("users")
          .select()
          .eq("id", recipe.data!.user_id)
          .single();
        if (error) {
          console.log(error);
        }
        setUsernameOP(data?.firstName + " " + data?.lastName);
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
          .eq("id", recipeId)
          .single();
        if (error) {
          console.log(error);
        }
        setTitle(data?.title);
        setDescription(data?.short_description);
        setDatePublished(
          formatDistanceToNow(new Date(data!.date_published), {
            addSuffix: true,
          }),
        );
        setDateUpdated(
          formatDistanceToNow(new Date(data!.updated_at), { addSuffix: true }),
        );
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
          .eq("id", recipeId)
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
          .eq("id", recipeId)
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
          .eq("id", recipeId)
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
      } catch (error) {
        console.log(error);
      }
    };

    const fetchComments = async () => {
      try {
        const recipe = await supabase
          .from("recipes")
          .select()
          .eq("id", recipeId)
          .single();
        const { error, data: commentsData } = await supabase
          .from("comments")
          .select()
          .eq("recipe_id", recipe.data!.id);
        if (error) {
          console.log(error);
        }
        const commentIds = commentsData?.map((entry) => entry.user_id);
        const usernameMap = await fetchCommentsUsers(commentIds);

        const userComments =
          commentsData?.map((entry) => ({
            comment: entry.comment,
            usernameComment: usernameMap?.get(entry.user_id || "Anonymous"),
            posted: formatDistanceToNow(new Date(entry.created_at), {
              addSuffix: true,
            }),
          })) || [];
        setComments(userComments);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCommentsUsers = async (commentIds) => {
      try {
        const promises = commentIds.map(async (commentId) => {
          const { error, data } = await supabase
            .from("users")
            .select("id, firstName, lastName")
            .eq("id", commentId);
          if (error) {
            console.log(error);
            return new Map();
          }
          return data[0];
        });
        const results = await Promise.all(promises);
        return new Map(
          results.map((user) => [
            user.id,
            `${user.firstName} ${user.lastName}`,
          ]),
        );
      } catch (error) {
        console.log(error);
        return new Map();
      }
    };

    const checkBookmarked = async () => {
      const { error, data } = await supabase
        .from("bookmarks")
        .select()
        .eq("user_id", Number(userId))
        .single();
      if (error) {
        console.log(error);
      }
      const bookmarkedIds = data?.recipe_ids || [];
      setIsBookmarked(bookmarkedIds.includes(recipeId));
    };

    fetchUser();
    fetchRecipe();
    fetchRatings();
    fetchIngredients();
    fetchTasteProfile();
    fetchComments();
    checkBookmarked();
  }, [userId, recipeId]);

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

  const CommentPost = ({ comment }) => {
    return (
      <div className="flex p-4 rounded-xl">
        <button className="w-16 h-16 rounded-full bg-gray-100">pfp</button>
        <div className="flex flex-col ml-2 w-5/6">
          <p className="text-lg font-medium mb-1">{comment.usernameComment}</p>
          <div className="border-2 border-green-400 rounded-xl p-2 whitespace-normal break-words">
            <p>{comment.comment}</p>
            <p className="mt-2 text-sm text-gray-500">{comment.posted}</p>
          </div>
        </div>
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
              <p className="text-xl font-medium">{usernameOP}</p>
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
                  <a href="#comments">
                    <FaRegStar className="text-3xl" />
                  </a>
                  <p>{ratingCount}</p>
                </div>
                <div className="flex w-auto h-8 pr-2 text-xl space-x-0.5">
                  <a href="#comments">
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
                  href="#comments"
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
        <div className="w-1/4 h-full rounded-xl p-10 ml-32 bg-white">
          <p className="mb-4 text-center text-4xl underline font-bold">
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
                  {`${ingredient} (${quantity})`}
                </p>
              </div>
            ))}
        </div>
        <div className="w-1/4 h-full rounded-xl p-10 bg-white">
          <p className="mb-4 text-center text-4xl underline font-bold">
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

      <div className="w-full h-full bg-gray-200">
        <div id="comments" className="w-full h-full px-96 pt-6">
          <div className="flex space-x-2 items-center">
            <div className="w-20 h-20 rounded-full bg-gray-100">pfp</div>
            <div className="flex flex-col w-1/2">
              <p className="text-xl mb-1 font-medium">{username}</p>
              <textarea
                className="w-full h-12 p-2 rounded-lg bg-white border-2 border-green-400 text-sm resize-y"
                placeholder="Add a comment..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
              />
            </div>
            <button
              className="h-1/2 p-2 mt-8 rounded-full bg-green-600"
              onClick={handleAddComment}
              disabled={commented}
            >
              Comment
            </button>
            <div className="pl-6">
              <CircleSlider onChange={handleSliderChange} />
            </div>
            <button
              className="h-1/2 p-2 mt-8 rounded-full bg-green-600"
              onClick={handleRating}
              disabled={rated}
            >
              {rated ? <div>Rated &#10003;</div> : "Add Rating"}
            </button>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="text-2xl font-bold">Comments</p>
              <p className="ml-2 text-2xl">{commentCount}</p>
            </div>
            <div>
              {comments.map((comment, index) => (
                <CommentPost key={index} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
