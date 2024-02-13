import {
  PostgrestSingleResponse,
  QueryData,
  SupabaseClient,
} from "https://esm.sh/v135/@supabase/supabase-js@2.39.3/dist/module/index.js";
import { Database } from "../_shared/types/types.ts";
import similarity from "https://esm.sh/compute-cosine-similarity";

type RecipeWithTasteProfile = {
  id: number;
  taste_profile_id: number | null;
  bookmark_count: number;
  comment_count: number;
  rating_count: number;
  recipe_taste_profiles: {
    sweetness: number;
    saltiness: number;
    sourness: number;
    bitterness: number;
    savoriness: number;
    spiciness: number;
  }[];
}[];

const BOOKMARK_CONSTANT = 0.5;

/**
 * Service Edge Function for generating recipe recommendations for a user
 * 
 * @param {SupabaseClient<Database>} client - the supabase client for accessing the database 
 * @param {number} userId - the user id of the user to generate recommendations for 
 * @returns 
 */
const service = async (client: SupabaseClient<Database>, userId: number) => {
  // retrieve the user's taste profile
  const QUERY_FIELDS =
    "sweetness, saltiness, sourness, bitterness, savoriness, spiciness";
  const userTasteProfile = await client
    .from("user_taste_profiles")
    .select(QUERY_FIELDS)
    .eq("user_id", userId)
    .single();
  // retrieve recently created recipes
  const recipes = await client
    .from("recipes")
    .select(
      `id, bookmark_count, comment_count, rating_count, taste_profile_id, recipe_taste_profiles!RecipeTasteProfiles_recipeId_fkey(${QUERY_FIELDS})`
    )

  // compute the cosine similarity between the user's taste profile and each recipe's taste profile
  const userTasteProfileVector = [
    userTasteProfile.data?.sweetness || 0,
    userTasteProfile.data?.saltiness || 0,
    userTasteProfile.data?.sourness || 0,
    userTasteProfile.data?.bitterness || 0,
    userTasteProfile.data?.savoriness || 0,
  ];

  const ranks = calculateRanks(userTasteProfileVector, recipes.data!);

  const recommendedRecipes = await client.from("recipes").select("*").in("id ", ranks.map(rank => rank.id));
  return recommendedRecipes.data;
};

/**
 * Helper function to calculate the rank for a given recipe
 * 
 * @param {number[]} userTasteProfile 
 * @param {RecipeWithTasteProfile} recipes 
 * @returns 
 */
const calculateRanks = (
  userTasteProfile: number[],
  recipes: RecipeWithTasteProfile
) => {
  const ranks = recipes.map((recipe) => {
    const recipeTasteProfile = recipe.recipe_taste_profiles[0];
    const recipeTasteProfileVector = [
      recipeTasteProfile?.sweetness || 0,
      recipeTasteProfile?.saltiness || 0,
      recipeTasteProfile?.sourness || 0,
      recipeTasteProfile?.bitterness || 0,
      recipeTasteProfile?.savoriness || 0,
    ];

    const similarityScore = similarity(
      userTasteProfile,
      recipeTasteProfileVector
    )!;
    const bookMarkScore = BOOKMARK_CONSTANT * recipe.bookmark_count;

    // later we can also analyze the comment sentiment to further improve the recommendation
    // we can also later generate embeddings for the recipe title and description to further improve the recommendation
    // finally, we can also look through the user's bookmarked recipes and recommend similar recipes
    return {
      id: recipe.id,
      score: similarityScore + bookMarkScore
    };
  });

  // normalize the scores
  const minScore = Math.min(...ranks.map((rank) => rank.score));
  const maxScore = Math.max(...ranks.map((rank) => rank.score));

  const normalizedRanks = ranks.map((rank) => {
    return {
      id: rank.id,
      score: normalize(minScore, maxScore)(rank.score),
    };
  });

    return normalizedRanks;
};

/**
 * Helper function to normalize a value to a range of 0 to 1
 * 
 * @param {number} min - the minimum value of the range
 * @param {number} max - the maximum value of the range
 * @returns 
 */
const normalize = (min: number, max: number) => {
  return (value: number) => {
    return (value - min) / (max - min);
  };
};

export { service as RecommendationService };
