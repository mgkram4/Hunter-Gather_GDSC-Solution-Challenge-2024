import { ROUTES } from "@/src/config/routes";
import { createClient } from "@utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainProfilePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", user.data.user?.email)
    .single();

  if (!user || data === null) {
    redirect(ROUTES.SIGNIN);
  } else {
    redirect(ROUTES.PROFILE + "/" + data?.id);
  }

  return <div>{error ? <h1>Error</h1> : <h1>Loading profile...</h1>}</div>;
}
