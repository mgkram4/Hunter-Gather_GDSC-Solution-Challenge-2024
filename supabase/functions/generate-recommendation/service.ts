import { PostgrestSingleResponse, QueryData, SupabaseClient } from "https://esm.sh/v135/@supabase/supabase-js@2.39.3/dist/module/index.js";
import { Database } from "../_shared/types/types.ts";
import similarity from "https://esm.sh/compute-cosine-similarity";

type RecipeWithTasteProfile = {
    id: number;
    taste_profile_id: number | null;
    recipe_taste_profiles: {
        sweetness: number;
        saltiness: number;
        sourness: number;
        bitterness: number;
        savoriness: number;
        spiciness: number;
    }[];
}[]

const BOOKMARK_CONSTANT = 0.5;
const LIKE_CONSTANT = 0.5;


const service = async (client: SupabaseClient<Database>, userId: number) => {
  // retrieve the user's taste profile
  const QUERY_FIELDS = "sweetness, saltiness, sourness, bitterness, savoriness, spiciness"
  const userTasteProfile = await client
    .from("user_taste_profiles")
    .select(QUERY_FIELDS)
    .eq("user_id", userId)
    .single();
  // retrieve recently created recipes
  const today = new Date();
  const interval = today.setDate(today.getDate() - 7);
  const recipes = await client
    .from("recipes")
    .select(
      `id, taste_profile_id, recipe_taste_profiles!RecipeTasteProfiles_recipeId_fkey(${QUERY_FIELDS})`
    ).gte("created_at", new Date(interval).toISOString())

    // compute the cosine similarity between the user's taste profile and each recipe's taste profile
    const userTasteProfileVector = [
        userTasteProfile.data!.sweetness,
        userTasteProfile.data!.saltiness,
        userTasteProfile.data!.sourness,
        userTasteProfile.data!.bitterness,
        userTasteProfile.data!.savoriness,
    ]

    console.log(recipes)
    return calculateRank(userTasteProfileVector, recipes.data!);

  
};

const calculateRank = (userTasteProfile: number[], recipes:RecipeWithTasteProfile) => {
    const ranks = recipes.map((recipe) => {
        const recipeTasteProfile = recipe.recipe_taste_profiles[0]
        const recipeTasteProfileVector = [
            recipeTasteProfile.sweetness,
            recipeTasteProfile.saltiness,
            recipeTasteProfile.sourness,
            recipeTasteProfile.bitterness,
            recipeTasteProfile.savoriness,
        ]

        const similarityScore = similarity(userTasteProfile, recipeTasteProfileVector)
        const bookMarkScore = recipe.

        return {
            id: recipe.id,
            similarityScore
        }
    })

    return ranks;
};


export { service as RecommendationService };
