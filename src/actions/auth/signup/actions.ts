import { redirect } from "next/navigation";
import { ROUTES } from "@/src/config/routes";
import { NewUser } from "@/supabase/functions/_shared/types/tables";
import { AuthHelpers } from "@/src/utils/helpers";

export enum AUTH_METHODS {
  GOOGLE = "google",
  FACEBOOK = "facebook",
  TRADITIONAL = "traditional",
  X = "x",
}

const enum ERROR_MESSAGES {
  ALREADY_REGISTERED = "User already registered",
  ALREADY_REGISTERED_POSTGRES = 'duplicate key value violates unique constraint "Users_pkey"',
  INVALID_LOGIN_CREDENTIALS = "Invalid login credentials",
}
const enum ERROR_RESPONSES {
  ALREADY_REGISTERED = "A user with this email already exists.",
  UNKNOWN = "An unknown error occurred.",
  INVALID_LOGIN_CREDENTIALS = "Invalid email/password combination.",
}

/**
 * Server action for signing up with email and password.
 *
 * @param {FormData} formData
 */
export const signUpWithEmailAction = async (formData: FormData) => {
  "use server";

  const supabase = AuthHelpers.getSupabaseClient();
  const { email, password } = AuthHelpers.getTradtionalAuthFormData(formData);

  const auth = await supabase.auth.signUp({
    email,
    password,
  });

  if (auth.error) {
    switch (auth.error.message) {
      case ERROR_MESSAGES.ALREADY_REGISTERED:
        redirect(
          `${ROUTES.SIGNUP}?error=${ERROR_RESPONSES.ALREADY_REGISTERED}`,
        );
      default:
        redirect(`${ROUTES.SIGNUP}?error=${ERROR_RESPONSES.UNKNOWN}`);
    }
  }

  const db = await supabase.from("Users").insert<NewUser>({
    uuid: auth.data!.user!.id,
    email,
  });

  if (db.error) {
    switch (db.error.message) {
      case ERROR_MESSAGES.ALREADY_REGISTERED_POSTGRES:
        redirect(
          `${ROUTES.SIGNUP}?error=${ERROR_RESPONSES.ALREADY_REGISTERED}`,
        );
    }
  }

  redirect(ROUTES.HOME);
};

/**
 * Server action for signing in with email and password.
 *
 * @param formData
 */
export const signInWithEmailAction = async (formData: FormData) => {
  "use server";

  const supabase = AuthHelpers.getSupabaseClient();
  const { email, password } = AuthHelpers.getTradtionalAuthFormData(formData);

  const auth = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (auth.error) {
    switch (auth.error.message) {
      case ERROR_MESSAGES.INVALID_LOGIN_CREDENTIALS:
        redirect(
          `${ROUTES.SIGNIN}?error=${ERROR_RESPONSES.INVALID_LOGIN_CREDENTIALS}`,
        );
      default:
        console.log(auth.error);
        redirect(`${ROUTES.SIGNIN}?error=${ERROR_RESPONSES.UNKNOWN}`);
    }
  }

  redirect(ROUTES.HOME);
};

export const signOutAction = async () => {
  "use server";

  const supabase = AuthHelpers.getSupabaseClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
  }

  redirect(ROUTES.HOME);
};
