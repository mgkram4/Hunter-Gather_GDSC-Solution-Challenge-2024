import { NewUser } from "@lib/models/users";
import { UserService } from "@lib/services";
import { supabase } from "@lib/supabase";

export const signUpWithGoogle = async () => {
  const auth = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  const { error, data } = await supabase.auth.getUser();

  if (auth.error || error) {
    throw new Error(auth.error?.message || error?.message);
  }

  const body: NewUser = {
    uuid: data.user.id,
    email: data.user.email!,
    authMethod: "google",
  };

  await UserService.createUser(body);
};
