import { useState, ChangeEvent } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

interface RecipeImageUploaderProps {
  supabase: SupabaseClient;
}

const ProfileImgUpload: React.FC<RecipeImageUploaderProps> = ({ supabase }) => {
  //pull user id as prop
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (!newFiles || newFiles.length === 0) {
      console.error("No files selected");
      return;
    }

    const selectedFile = newFiles[0];
    setFile(selectedFile);
  };

  const uploadProfileImg = async () => {
    if (!file) {
      console.log("No File Selected");
      return;
    }

    const fileName = file.name;
    const fileExtension = file.slice(
      ((fileName.lastIndexOf(".") - 1) >>> 0) + 2,
    );

    const { error, data } = await supabase.storage
      .from("profile-pictures")
      .upload(`profile_${Date.now()}.${fileExtension}`, file); //change date to first last name

    if (error) {
      console.log("Error Uploading Image", error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadProfileImg}>Upload Profile Picture</button>
    </div>
  );
};

export default ProfileImgUpload;
