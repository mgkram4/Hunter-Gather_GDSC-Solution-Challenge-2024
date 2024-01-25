"use client";
import Input from "@/src/components/input/input";
import Slider from "@/src/components/input/slider";
import Textarea from "@/src/components/input/textarea";
import { useAuth } from "@/src/utils/hooks/auth-hook";
import { createClient } from "@/src/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateRecipe() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async () => {
      await useAuth(router);
    };
  }, []);
  return (
    <div className={"flex flex-col h-screen mt-10 mx-[12%]"}>
      <h1 className={"text-center text-5xl"}>Create Your Masterpiece</h1>
      <form>
        <Input
          labelClassName={"text-3xl font-bold"}
          label={"Title"}
          name="title"
        />
        <Input
          labelClassName={"text-3xl font-bold mt-2"}
          label={"Description"}
          name="description"
        />
        <Textarea
          labelClassName={"text-3xl font-bold mt-2"}
          label={"Ingredients"}
          className={"min-h-[200px]"}
          name="ingredients"
        />
        <Textarea
          labelClassName={"text-3xl font-bold mt-2"}
          label={"Instructions"}
          className={"min-h-[200px]"}
          name="instructions"
          showPreview
        />
        <Slider name={"sweetness"} range={10} />
      </form>
    </div>
  );
}
