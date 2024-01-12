// This page is a test for supabase setup and will be deleted once we start building the app
import { supabase } from "@api/supabase";

export default async function Notes() {
  const { data: notes } = await supabase.from("notes").select();

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
