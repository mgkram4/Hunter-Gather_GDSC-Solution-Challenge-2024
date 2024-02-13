import { Database } from "./supabase";

export type Tables = Database["public"]["Tables"];

export type User = Tables["users"]["Row"];
export type NewUser = Tables["users"]["Insert"];

export type Recipe = Tables["recipes"]["Row"];
export type NewRecipe = Tables["recipes"]["Insert"];
export type Bookmarks = Tables["bookmarks"]["Row"];
