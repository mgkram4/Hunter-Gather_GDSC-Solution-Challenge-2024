import { createClient } from "https://esm.sh/@supabase/supabase-js";
import { Database } from "../_shared/types/types.ts";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../_shared/constants.ts";
import {
  env,
  pipeline,
} from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.5.0";
import { RecommendationService } from "./service.ts";

// Configuration for Deno runtime
env.useBrowserCache = false;
env.allowLocalModels = false;

/**
 * Serverless function for generating recipe recommendations
 */
Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization");
   const supabaseClient = createClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      global: { headers: { Authorization: authHeader! } },
    }
  );

  // retrieve recently created recipes
  const recipes = await RecommendationService(supabaseClient, 37);

  
  return new Response(JSON.stringify(recipes), {
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
