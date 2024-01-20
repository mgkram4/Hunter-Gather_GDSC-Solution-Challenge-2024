"use client";

import { User, Recipe } from "@/src/types/tables";
import { createClient } from "@/src/utils/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function Recipe() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | null | undefined>(
    undefined,
  );
  const [datePublished, setDatePublished] = useState<string | undefined>(
    undefined,
  );
  const [dateUpdated, setDateUpdated] = useState<string | undefined>(undefined);
  const [prep, setPrep] = useState<JSON | undefined>(undefined);
  const [ingredients, setIngredients] = useState<JSON | undefined>(undefined);

  useEffect(() => {
    const fetchRecipe = async () => {
      const supabase = createClient();
      try {
        const { error, data } = await supabase
          .from("recipes")
          .select()
          .match({ id })
          .single();
        if (error) {
          console.log(error);
        }
        setTitle(data?.title);
        setDescription(data?.short_description);
        setDatePublished(format(new Date(data!.date_published), "MMM d, yyyy"));
        setDateUpdated(format(new Date(data!.updated_at), "MMM d, yyyy"));
        setPrep(data?.instructions as JSON | undefined);
        console.log(prep);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchIngredients = async () => {
      const supabase = createClient();
      try {
        const recipe = await supabase
          .from("recipes")
          .select()
          .match({ id })
          .single();
        const { error, data } = await supabase
          .from("ingredients")
          .select()
          .eq("recipe_id", recipe.data!.id)
          .single();
        if (error) {
          console.log(error);
        }
        setIngredients(data?.items as JSON | undefined);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
    fetchIngredients();
  }, [id]);

  return (
    <div className="w-full h-full bg-gray-200">
      <div className="flex w-full h-1/2 p-4">
        <div className="flex flex-col w-1/4 items-center">
          <div className="flex space-x-3 mt-6 mb-12">
            <button className="w-14 h-14 rounded-full bg-gray-100">pfp</button>
            <div className="mt-1">
              <p>Username</p>
              <p>@handle</p>
            </div>
          </div>

          <div className="w-3/5 h-full">
            <p className="text-center text-2xl font-bold underline mb-2">
              Properties
            </p>
            <div className="h-10 px-2 py-1 rounded-lg mb-4 text-center bg-green-600"></div>
            <div className="h-10 px-2 py-1 rounded-lg mb-4 text-center bg-green-600"></div>
            <div className="h-10 px-2 py-1 rounded-lg mb-4 text-center bg-green-600"></div>
            <div className="h-10 px-2 py-1 rounded-lg mb-4 text-center bg-green-600"></div>
            <div className="h-10 px-2 py-1 rounded-lg mb-4 text-center bg-green-600"></div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="mb-6">
            <p className="text-5xl font-bold">{title}</p>
            {description && <p className="text-xl my-2">{description}</p>}
            <p className="text-sm mb-2">
              Posted: {datePublished} &nbsp;&nbsp;&nbsp;&nbsp; Last Updated:{" "}
              {dateUpdated}
            </p>
            <div className="flex">
              <div className="w-8 h-8 mr-4 bg-green-400"></div>
              <div className="w-8 h-8 mr-4 bg-green-400"></div>
              <div className="w-8 h-8 mr-4 bg-green-400"></div>
              <div className="w-8 h-8 mr-4 bg-green-400"></div>
              <div className="w-8 h-8 mr-4 bg-green-400"></div>
            </div>
          </div>

          <div className="flex w-5/6 h-full pb-6">
            <div className="flex h-full mr-2 justify-center items-center text-3xl">
              <a href="">&lt;</a>
            </div>
            <div className="flex space-x-8 w-full h-full mx-2 justify-center">
              <div className="w-1/4 h-full rounded-xl bg-black">
                <img src="" alt="" />
              </div>
              <div className="w-1/4 h-full rounded-xl bg-black">
                <img src="" alt="" />
              </div>
              <div className="w-1/4 h-full rounded-xl bg-black">
                <img src="" alt="" />
              </div>
              <div className="w-1/4 h-full rounded-xl bg-black">
                <img src="" alt="" />
              </div>
            </div>
            <div className="flex h-full ml-2 justify-center items-center text-3xl">
              <a href="">&gt;</a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-48 w-full h-1/2 mt-10 pb-10 bg-gray-200">
        <div className="w-1/4 h-[35rem] rounded-xl p-4 ml-32 bg-white">
          <p className="mb-4 text-center text-3xl underline font-bold">
            Ingredients
          </p>
          {ingredients &&
            Object.entries(ingredients).map(([ingredient, quantity], index) => (
              <p key={ingredient} className="ml-8 text-xl mb-2">
                - {`${ingredient}: ${quantity}`}
              </p>
            ))}
        </div>
        <div className="w-1/4 h-[35rem] rounded-xl p-4 bg-white">
          <p className="mb-4 text-center text-3xl underline font-bold">
            Preparation
          </p>
          {prep &&
            Object.entries(prep).map(([step, instruction], index) => (
              <p key={step} className="ml-8 text-xl mb-2">
                {`${index + 1}. ${instruction}`}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
