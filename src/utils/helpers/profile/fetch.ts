import { createClient } from "@utils/supabase/client";

export const fetchUserProfile = async (userId: string) => {
  const supabase = createClient();
  try {
    const { error, data } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null; // or handle the error as per your application's need
  }
};

export const fetchTasteProfile = async (userId: string) => {
  const supabase = createClient();
  try {
    const { error, data } = await supabase
      .from("user_taste_profiles")
      .select()
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching taste profile:", error);
    return null; // or handle the error as per your application's need
  }
};

export const fetchPosts = async (userId: string) => {
  const supabase = createClient();
  try {
    const { error, data } = await supabase
      .from("recipes")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return null; // or handle the error as per your application's need
  }
};
