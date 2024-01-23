"use server";

import { redirect } from "next/navigation";
import { ROUTES } from "@config/routes";
import { NewUser } from "@/supabase/functions/_shared/types/tables";
import { AuthHelpers } from "@utils/helpers/auth";
import { ERROR_MESSAGES, ERROR_RESPONSES } from "@utils/helpers/auth/enums";

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
