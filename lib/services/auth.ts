"use server";

import { UserService } from ".";
import { supabase } from "@lib/supabase";

type EmailBody = {
  email: string;
  password: string;
};

/**
 *
 * @param email
 * @param password
 * @returns
 */
export const signUpWithEmail = async (body: EmailBody) => {
  if (!body.email || !body.password) {
    throw new Error("Email and password are required");
  } else {
    const user = await supabase.auth.signUp({
      email: body.email as string,
      password: body.email as string,
    });

    await UserService.createUser({
      uuid: user.data.user?.id as string,
      email: body.email as string,
    });
  }
};

export const signInWithEmail = async (body: EmailBody) => {
  if (!body.email || !body.password) {
    throw new Error("Email and password are required");
  } else {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: body.email as string,
      password: body.password as string,
    });

    if (error) {
      throw new Error(error.message);
    }
  }
};
