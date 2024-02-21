import { useState, ChangeEvent } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

interface RecipeImageUploaderProps {
  supabase: SupabaseClient;
  username: String;
  id: String;
}

const ProfileImgUpload: React.FC<RecipeImageUploaderProps> = ({
  supabase,
  username,
  id,
}) => {
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

    const { error: uploadError, data: uploadData } = await supabase.storage
      .from("profile-pictures")
      .upload(`profile_${username}.${fileExtension}`, file);

    if (uploadError) {
      console.log("Error Uploading Image", uploadError.message);
    } else {
      const url = `https://xnjgzwpzppkttqesxmhj.supabase.co/storage/v1/object/public/profile-images/${uploadData.path}`;
      const { error: storageError, data: storageData } = await supabase
        .from("users")
        .update({ profilePicture: url })
        .eq("id", id);
      if (storageError) {
        console.log("Error Storing Image", storageError.message);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadProfileImg} />
    </div>
  );
};

export default ProfileImgUpload;
