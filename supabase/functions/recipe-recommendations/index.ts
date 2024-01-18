import { createClient } from "https://esm.sh/@supabase/supabase-js";
import { Database } from "../_shared/types/supabase.ts";
import similarity from "https://esm.sh/compute-cosine-similarity@1.1.0";

const SUPABASE_URL = Deno.env.get("LOCAL_SUPABASE_URL") || Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("LOCAL_SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "";

const calculateSimilarity = (x: number[], y: number[]) => {
  return similarity(x, y);
}

Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization");

  const supabaseClient = createClient<Database>(
    SUPABASE_URL, SUPABASE_ANON_KEY,
    {
      global: { headers: { Authorization: authHeader! } },
    },
  );

  // for testing purposes
  const userId = 37;
  /*  // load the users taste profile 
  const user = await supabaseClient.auth.getUser();

  const userId = user.data.user.id;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  
  
  */
  const userTasteProfiles = await supabaseClient
    .from("user_taste_profiles")
    .select("bitterness, saltiness, sweetness, sourness, spiciness");


  const recipes = await supabaseClient.from("recipes").select("*");

  const recipeTasteProfiles = await Promise.all(recipes.data!.map(async (recipe) => {
    const recipeTasteProfile = await supabaseClient
      .from("recipe_taste_profiles")
      .select("bitterness, saltiness, sweetness, sourness, spiciness")
      .eq("recipe_id", recipe.id);


    const values = [
      recipeTasteProfile.data![0].bitterness,
      recipeTasteProfile.data![0].saltiness,
      recipeTasteProfile.data![0].sweetness,
      recipeTasteProfile.data![0].sourness,
      recipeTasteProfile.data![0].spiciness,
    ]

    return values;
  }));

  const userValues = [
    userTasteProfiles.data![0].bitterness,
    userTasteProfiles.data![0].saltiness,
    userTasteProfiles.data![0].sweetness,
    userTasteProfiles.data![0].sourness,
    userTasteProfiles.data![0].spiciness,
  ]

  const similarityScores = recipeTasteProfiles.map((recipeTasteProfile) => {
    return calculateSimilarity(userValues, recipeTasteProfile);
  })
  

  return new Response(JSON.stringify(similarityScores), {
    headers: { "Content-Type": "application/json" },
  });
});
/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/recipe-recommendations' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
