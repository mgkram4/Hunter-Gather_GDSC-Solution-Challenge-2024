"use client";

import CreateRecipeForm, {
  RecipeSchema,
} from "@/src/components/form/create-recipe";
import { useAuth } from "@/src/utils/hooks/auth-hook";
import { createClient } from "@/src/utils/supabase/client";
import {
  NewIngredient,
  NewRecipe,
  NewRecipeTasteProfile,
} from "@/supabase/functions/_shared/types/tables";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateRecipe() {
  const supabase = createClient();
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleSubmit = async (values: RecipeSchema) => {
    const user = await useAuth(router);
    const userId = await supabase
      .from("users")
      .select("id")
      .eq("email", user!.user!.email!)
      .single();
    const datePublished = new Date();

    const recipeBody: NewRecipe = {
      title: values.title,
      short_description: values.description,
      instructions: values.instructions,
      user_id: userId.data!.id,
      date_published: datePublished.toISOString(),
    };

    const ingredientsLine = values.ingredients.split("\n");

    // TODO: validate this better

    const itemList = ingredientsLine.map((line) => {
      const [item, _] = line.split(",");
      return item;
    });

    const quantityList = ingredientsLine.map((line) => {
      const [_, quantity] = line.split(",");
      return quantity;
    });

    const ingredientsList = itemList.map((item, i) => {
      return {
        [item]: quantityList[i],
      };
    });

    try {
      const newRecipe = await supabase
        .from("recipes")
        .insert(recipeBody)
        .select()
        .single();

      const recipieTasteProfileBody: NewRecipeTasteProfile = {
        bitterness: values.bitterness!,
        saltiness: values.saltiness!,
        sourness: values.sourness!,
        spiciness: values.spiciness!,
        savoriness: values.savoriness!,
        sweetness: values.sweetness!,
        recipe_id: newRecipe.data!.id,
      };

      const ingredientsBody: NewIngredient = {
        items: ingredientsList[0],
        recipe_id: newRecipe.data!.id,
      };

      const tasteProfile = await supabase
        .from("recipe_taste_profiles")
        .insert(recipieTasteProfileBody);

      const newIngredients = await supabase
        .from("ingredients")
        .insert(ingredientsBody);

      if (newIngredients.error) {
        throw new Error(newIngredients.error.message);
      }

      if (tasteProfile.error) {
        throw new Error(tasteProfile.error.message);
      }

      // TODO: fix this when we have a recipe page
      router.push(`/recipe/${newRecipe.data!.id}`);
      setSubmissionError("success");
    } catch (error: any) {
      if (error.message) {
        setSubmissionError(error.message);
      }
    }
  };

  useEffect(() => {
    async () => {
      await useAuth(router);
    };
  }, []);
  return (
    <div className="m-4 bg-gradient-to-b from-secondary via-ghost to-whit rounded-xl p-4">
      <div className={"flex flex-col min-h-full mt-8 mx-[12%] "}>
        <h1 className={"text-center text-5xl mb-4 font-bold"}>
          Create Your Masterpiece
        </h1>
        <CreateRecipeForm handleSubmit={handleSubmit} />
        {submissionError && (
          <span className="font-bold text-red-500">{submissionError}</span>
        )}
      </div>
    </div>
  );
}
