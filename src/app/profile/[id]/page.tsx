"use client";

/*TODO
  - Import/set up profile picture
  - Import and set up recipes/posts 
*/

import { createClient } from "@utils/supabase/client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Tables } from "@/supabase/functions/_shared/types/tables";
import { useAuth } from "@utils/hooks/auth-hook";
import { useRouter } from "next/navigation";
import {
  fetchTasteProfile,
  fetchUserProfile,
  fetchPosts,
} from "@/src/utils/helpers/profile/fetch";
//import PostSmall from "../../homepage/post-small";

interface UserStats {
  recipeCount: number;
  followerCount: number;
  followingCount: number;
}

type paramId = {
  id: string;
};

export default function ProfilePage() {
  const capitalize = (str: string) => {
    try {
      if (!str) throw Error("String is empty or undefined");
      if (!str.match(/[A-Z]/gi)) throw new Error("String is not a word");
      return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (err) {
      console.error(err);
    }
  };

  const params = useParams<paramId>();
  const id = params.id;

  const [tasteProfile, setTasteProfile] = useState<
    Tables["user_taste_profiles"]["Row"] | undefined | null
  >();
  const tasteAttributes = [
    "sweetness",
    "saltiness",
    "sourness",
    "bitterness",
    "savoriness",
    "spiciness",
  ];

  const [userStats, setUserStats] = useState<UserStats | undefined>({
    recipeCount: 0,
    followerCount: 0,
    followingCount: 0,
  });

  const [profilePicture, setProfilePicture] = useState<
    string | undefined | null
  >();
  const [firstName, setFirstName] = useState<string | undefined | null>("");
  const [lastName, setLastName] = useState<string | undefined | null>("");
  const [handle, setHandle] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState<string | undefined>("");
  const [isCurrentUser, setIsCurrentUser] = useState<boolean | undefined>(
    false,
  );
  const [posts, setPosts] = useState<any>();

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const loadTastes = async () => {
      const tastes = await fetchTasteProfile(id as string);
      setTasteProfile(tastes);
    };

    const loadProfile = async () => {
      const profile = await fetchUserProfile(id as string);
      setFirstName(profile?.firstName);
      setLastName(profile?.lastName);
      setProfilePicture(profile?.profilePicture);

      const user = await useAuth(router);
      if (user?.user && profile && user.user.email === profile.email)
        setIsCurrentUser(true);
    };
    /*
    const loadPosts = async() =>{
      const posts = await fetchPosts(id as string);
      setPosts(userPosts);
    }
    */
    loadTastes();
    loadProfile();
  }, [id, supabase]);

  if (!handle && firstName && lastName)
    setHandle(firstName?.charAt(0) + lastName);

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <div className="flex flex-row items-center justify-evenly">
        <div className="flex flex-col items-center">
          <img
            alt={`${firstName}'s profile`}
            src={profilePicture ? profilePicture : "/defaultpfp.png"}
            className="w-32 h-32 rounded-full object-cover m-3 p-3"
          />
          <div>
            <h1 className="text-2xl font-bold">{`${firstName} ${lastName}`}</h1>
            <p className="text-secondary">{handle?.toLowerCase()}</p>
          </div>
          {isCurrentUser && (
            <div className="flex mt-4 md:mt-0 p-8 justify-center">
              <button className="bg-secondary text-ghost px-4 py-2 rounded-lg mx-2">
                Settings
              </button>
              <button className="bg-secondary text-ghost px-4 py-2 rounded-lg mx-2">
                Share
              </button>
            </div>
          )}
        </div>
        <div className="mt-4 md:mt-0 md:flex md:items-center md:space-x-6 flex-wrap flex-col">
          <div className="flex justify-between space-x-4 m-4 p-2">
            <div className="text-center m-4 pl-2 pr-2">
              <p className="text-lg font-bold">Recipes</p>
              <p className="text-base font-bold bg-ghost py-1 rounded-lg">
                {userStats ? userStats?.recipeCount : 0}
              </p>
            </div>
            <div className="text-center m-4 pl-2 pr-2">
              <p className="text-lg font-bold">Followers</p>
              <p className="text-base font-bold bg-ghost py-1 rounded-lg">
                {userStats ? userStats?.recipeCount : 0}
              </p>
            </div>
            <div className="text-center m-4 pl-2 pr-2">
              <p className="text-lg font-bold">Following</p>
              <p className="text-base font-bold bg-ghost py-1 rounded-lg">
                {userStats ? userStats?.recipeCount : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="flex mt-4 md:mt-0">
          <div className="rounded-lg px-2 text-sm font-semibold">
            <p className="text-sm text-black mr-2 mb-2">{"Sweetness"}</p>
            <p className="bg-primary text-ghost rounded-lg px-3 py-1 text-sm mr-2 mb-2 text-center">
              {tasteProfile ? tasteProfile?.sweetness : 0}
            </p>
          </div>
          <div className="rounded-lg px-2 text-sm font-semibold">
            <p className="text-sm text-black mr-2 mb-2">{"Saltiness"}</p>
            <p className="bg-primary text-ghost rounded-lg px-3 py-1 text-sm mr-2 mb-2 text-center">
              {tasteProfile ? tasteProfile?.saltiness : 0}
            </p>
          </div>
          <div className="rounded-lg px-2 text-sm font-semibold">
            <p className="text-sm text-black mr-2 mb-2">{"Sourness"}</p>
            <p className="bg-primary text-ghost rounded-lg px-3 py-1 text-sm mr-2 mb-2 text-center">
              {tasteProfile ? tasteProfile?.sourness : 0}
            </p>
          </div>
          <div className="rounded-lg px-2 text-sm font-semibold">
            <p className="text-sm text-black mr-2 mb-2">{"Bitterness"}</p>
            <p className="bg-primary text-ghost rounded-lg px-3 py-1 text-sm mr-2 mb-2 text-center">
              {tasteProfile ? tasteProfile?.bitterness : 0}
            </p>
          </div>
          <div className="rounded-lg px-2 text-sm font-semibold">
            <p className="text-sm text-black mr-2 mb-2">{"Savoriness"}</p>
            <p className="bg-primary text-ghost rounded-lg px-3 py-1 text-sm mr-2 mb-2 text-center">
              {tasteProfile ? tasteProfile?.savoriness : 0}
            </p>
          </div>
          <div className="rounded-lg px-2 text-sm font-semibold">
            <p className="text-sm text-black mr-2 mb-2">{"Spiciness"}</p>
            <p className="bg-primary text-ghost rounded-lg px-3 py-1 text-sm mr-2 mb-2 text-center">
              {tasteProfile ? tasteProfile?.spiciness : 0}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-black text-center">{bio}</p>
      </div>
      <hr className="h-px my-10 bg-primary border-0"></hr>
    </div>
  );
}
