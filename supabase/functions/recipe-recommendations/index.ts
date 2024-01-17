import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Database } from "../_shared/types/supabase.ts";

Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization");

  const supabaseClient = createClient<Database>(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: { headers: { Authorization: authHeader! } },
      db: { schema: "public" },
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

  const tasteProfile = await supabaseClient
    .from("UserTasteProfiles")
    .select("*");

  return new Response(JSON.stringify(tasteProfile), {
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
