"use server";

import { UserService } from ".";
import { supabase } from "@lib/supabase";

/**
 *
 * @param email
 * @param password
 * @returns
 */
export const signUpWithEmail = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

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
};

export const signInWithEmail = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required",
      };
    } else {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: email as string,
        password: password as string,
      });

      if (error) {
        throw new Error(error.message);
      } else {
        return {
          success: true,
          message: "Signed in successfully",
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      message: "There was an error",
    };
  }
};
