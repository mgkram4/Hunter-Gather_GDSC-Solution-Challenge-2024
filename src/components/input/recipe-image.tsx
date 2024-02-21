import { useState, ChangeEvent } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

interface RecipeImageUploaderProps {
  supabase: SupabaseClient;
  recipe_id: String;
}

const RecipeImgUpload: React.FC<RecipeImageUploaderProps> = ({
  supabase,
  recipe_id,
}) => {
  const [files, setFiles] = useState<File[] | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (!newFiles) {
      console.error("No files selected");
      return;
    }

    const filesArray = Array.from(newFiles);
    setFiles((prevFiles) => {
      const currentFiles = prevFiles || [];
      return [...currentFiles, ...filesArray];
    });
  };

  const uploadRecipeImg = async () => {
    if (!files || files?.length === 0) {
      console.log("No Files Selected");
      return;
    }

    const validFiles = files.filter((file) => file !== undefined);
    const uploadPromises = validFiles?.map(async (file, index) => {
      const fileName = file.name;
      const fileExtension = fileName.slice(
        ((fileName.lastIndexOf(".") - 1) >>> 0) + 2,
      );

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("recipe-images")
        .upload(`recipe_${recipe_id}_${index + 1}.${fileExtension}`, file);
      if (uploadError) {
        console.log(`Error Uploading Image ${index + 1}:`, uploadError.message);
      } else {
        const url = `https://xnjgzwpzppkttqesxmhj.supabase.co/storage/v1/object/public/recipe-images/${uploadData.path}`;
        const { error: recipeError, data: recipeData } = await supabase
          .from("recipes")
          .select("images")
          .eq("id", recipe_id)
          .single();
        if (recipeError) {
          console.log("Error Storing Image", recipeError.message);
          return;
        }

        const images = recipeData?.images || [];
        images.push(url);
        const { error: storageError, data: storageData } = await supabase
          .from("recipes")
          .update({ images })
          .eq("id", recipe_id);

        if (storageError) {
          console.log("Error Storing Image", storageError.message);
        } else if (index === 0) {
          const { error: headlinerError, data: headlinerData } = await supabase
            .from("recipe")
            .update({ headliner_image: url })
            .eq("id", recipe_id);

          if (headlinerError) {
            console.log(
              "Error Setting Headliner Image",
              headlinerError.message,
            );
          }
        }
      }
    });
    await Promise.all(uploadPromises);
    setFiles(null);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={uploadRecipeImg} />
    </div>
  );
};

export default RecipeImgUpload;
