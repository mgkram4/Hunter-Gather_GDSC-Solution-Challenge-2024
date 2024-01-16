import { cookies } from "next/headers";
import { createClient } from "@utils/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/src/config/routes";
import { NewUser } from "@/src/types/tables";

export const signUpWithEmailAction = async (formData: FormData) => {
  "use server";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const auth = await supabase.auth.signUp({
    email,
    password,
  });

  if (auth.error) {
    switch (auth.error.message) {
      case "User already registered":
        redirect(
          `${ROUTES.SIGNUP}?error=A user with this email already exists.`
        );
    }
  }

  const db = await supabase.from("Users").insert<NewUser>({
    uuid: auth.data!.user!.id,
    email,
  });

  if (db.error) {
    switch (db.error.message) {
      case 'duplicate key value violates unique constraint "Users_pkey"':
        redirect(`${ROUTES.SIGNUP}?error=This email is already in use.`);
    }
  }

  redirect(ROUTES.HOME);
};

export const signInWithEmailAction = async (formData: FormData) => {
  "use server";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const auth = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (auth.error) {
    switch (auth.error.message) {
      case "Invalid credentials":
        redirect(`${ROUTES.SIGNIN}?error=Invalid credentials.`);
    }
  }

  redirect(ROUTES.HOME);
};

export const signOutAction = async () => {
  "use server";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
  }

  redirect(ROUTES.HOME);
};
