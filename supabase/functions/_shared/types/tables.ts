import { Database } from "./types.ts";

export type Tables = Database["public"]["Tables"];

export type User = Tables["users"];
export type NewUser = User["Insert"];

export type Recipe = Tables["recipes"];
export type NewRecipe = Recipe["Insert"];

export type RecipeTasteProfile = Tables["recipe_taste_profiles"];
export type NewRecipeTasteProfile = RecipeTasteProfile["Insert"];

export type Ingredient = Tables["ingredients"];
export type NewIngredient = Ingredient["Insert"];
