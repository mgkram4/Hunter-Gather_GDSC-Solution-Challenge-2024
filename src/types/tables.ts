import { Database } from "./supabase";

export type Tables = Database["public"]["Tables"];

export type User = Tables["Users"]["Row"];
export type NewUser = Tables["Users"]["Insert"];

export type Recipe = Tables["Recipes"]["Row"];
export type NewRecipe = Tables["Recipes"]["Insert"];
