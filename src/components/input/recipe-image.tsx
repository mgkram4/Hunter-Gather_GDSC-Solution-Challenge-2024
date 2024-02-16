import { useState, ChangeEvent } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

interface RecipeImageUploaderProps {
  supabase: SupabaseClient;
}

const RecipeImgUpload: React.FC<RecipeImageUploaderProps> = ({ supabase }) => {
  //pull user id as prop
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

      const { error, data } = await supabase.storage
        .from("recipe-images")
        .upload(`recipe_${Date.now()}_${index + 1}.${fileExtension}`, file); //change date to first last name

      if (error) {
        console.log(`Error Uploading Image ${index + 1}:`, error.message);
      }
    });
    await Promise.all(uploadPromises);
    setFiles(null);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={uploadRecipeImg}>Upload Recipe Images</button>
    </div>
  );
};

export default RecipeImgUpload;
