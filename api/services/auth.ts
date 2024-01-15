import { NewUser } from "@api/models/users";
import { UserService } from ".";
import { supabase } from "@api/supabase";

/**
 *
 * @param email
 * @param password
 * @returns
 */
export const signupWithEmail = async (email: string, password: string) => {
  try {
    const data: NewUser = {
      email,
      password,
      authMethod: "traditional",
    };
    const user = await UserService.createUser(data);

    supabase.auth.signUp({
      email,
      password,
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};
