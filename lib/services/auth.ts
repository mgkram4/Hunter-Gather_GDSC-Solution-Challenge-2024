import { NewUser } from "@lib/models/users";
import { UserService } from ".";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_KEY, SUPABASE_URL } from "@config/constants";
import { SupabaseClient } from "@supabase/supabase-js";
import { logger } from "@lib/logger";

type EmailBody = {
  email: string;
  password: string;
};

export enum AUTH_METHODS {
  TRADITIONAL = "traditional",
  GOOGLE = "google",
  FACEBOOK = "facebook",
  X = "x",
}

/**
 * Service function for signing up a user with email and password.
 *
 * @param {string} email - the email to sign up with
 * @param {string} password - the password to sign up with
 * @returns {Promise<void>}
 */
export const signUpWithEmail = async (
  body: EmailBody,
  supabase: SupabaseClient<any, "public", any>,
) => {
  if (!body.email || !body.password) {
    throw new Error("Email and password are required");
  } else {
    const user = await supabase.auth.signUp({
      email: body.email,
      password: body.password,
    });

    if (user.error) {
      throw new Error(user.error.message);
    }

    await UserService.createUser({
      email: body.email as string,
      uuid: user.data.user?.id as string,
    });
  }
};

/**
 * Service function for signing in a user with email and password.
 *
 * @param {string} email - the email to sign in with
 * @param {string} password - the password to sign in with
 * @returns {Promise<void>}
 */
export const signInWithEmail = async (
  body: EmailBody,
  supabase: SupabaseClient<any, "public", any>,
) => {
  if (!body.email || !body.password) {
    throw new Error("Email and password are required");
  } else {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error) {
      throw new Error(error.message);
    }
  }
};

export const signUpWithProvider = async (
  provider: AUTH_METHODS,
  code: string,
  supabase: SupabaseClient<any, "public", any>,
) => {
  const { error, data } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    throw new Error(error.message);
  }

  const body: NewUser = {
    email: data.user.email!,
    uuid: data.user.id,
    authMethod: provider,
  };

  await UserService.createUser(body);
};
