"use server";

import { NewUser } from "@api/models/users";
import { UserService } from ".";
import { supabase } from "@api/supabase";

/**
 *
 * @param email
 * @param password
 * @returns
 */
export const signUpWithEmail = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    } else {
      const user = await supabase.auth.signUp({
        email: email as string,
        password: password as string,
      });

      await UserService.createUser({
        uuid: user.data.user?.id as string,
        email: email as string,
      });
    }
  } catch (error) {
    // TODO form error handling
    console.log(error);
  }
};
