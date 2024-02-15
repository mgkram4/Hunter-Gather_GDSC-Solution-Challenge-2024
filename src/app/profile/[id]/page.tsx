"use client";

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
import { ROUTES } from "@/src/config/routes";
import { ERROR_RESPONSES } from "@/src/utils/helpers/auth/enums";
import { Recipe } from "@/src/types/tables";
import PostSmall from "@/src/components/homepage/post-small";
import PostLoading from "@/src/components/homepage/post-loading";

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

  const router = useRouter();
  const supabase = createClient();
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await useAuth(router);

        if (!user.user) {
          router.push(
            `${ROUTES.SIGNIN}?error=${ERROR_RESPONSES.AUTH_REQUIRED}`,
          );
          return;
        }

        const fetchedRecipes = await fetchRecipes([user.user.id]);
        setRecipes(fetchedRecipes);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    // Your code here
  }, []);

  const fetchRecipes = async (recipeIds: string[]) => {
    // Implement your logic to fetch recipes based on IDs
    // For now, returning an empty array
    return [];
  };

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

  const loadUserStats = async () => {
    // Implement your logic to fetch and set user stats
    // For now, returning placeholder values
    setUserStats({
      recipeCount: 10,
      followerCount: 20,
      followingCount: 15,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await useAuth(router);

        if (!user.user) {
          router.push(
            `${ROUTES.SIGNIN}?error=${ERROR_RESPONSES.AUTH_REQUIRED}`,
          );
          return;
        }

        await loadTastes();
        await loadProfile();
        await loadUserStats();
        const fetchedPosts = await fetchPosts(id as string);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, supabase]);

  if (!handle && firstName && lastName)
    setHandle(firstName?.charAt(0) + lastName);

  return (
    <div className="flex flex-col  justify-center p-8 space-y-8 md:space-y-0 md:space-x-8">
      <div className="flex flex-col items-center space-y-4">
        <img
          alt={`${firstName}'s profile`}
          src={profilePicture ? profilePicture : "/defaultpfp.png"}
          className="w-32 h-32 rounded-full object-cover m-3 p-3 max-w-full"
        />
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-3xl font-bold">{`${firstName} ${lastName}`}</h1>
          <p className="text-lg text-secondary">{handle?.toLowerCase()}</p>
          <div className="flex p-2 space-x-2">
            <button className="bg-secondary text-ghost px-2 py-1 rounded-lg">
              Settings
            </button>
            <button className="bg-secondary text-ghost px-2 py-1 rounded-lg">
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-2">
        <div className="text-center p-2">
          <p className="text-2xl font-bold">Recipes</p>
          <p className="text-lg font-bold bg-ghost py-1 rounded-lg ">
            {userStats ? userStats?.recipeCount : 0}
          </p>
        </div>
        <div className="text-center p-2">
          <p className="text-2xl font-bold">Followers</p>
          <p className="text-lg font-bold bg-ghost py-1 rounded-lg">
            {userStats ? userStats?.followerCount : 0}
          </p>
        </div>
        <div className="text-center p-2">
          <p className="text-2xl font-bold">Following</p>
          <p className="text-lg font-bold bg-ghost py-1 rounded-lg">
            {userStats ? userStats?.followingCount : 0}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-6">
        <div className="max-w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center mb-10 gap-6">
          {[
            "Sweetness",
            "Saltiness",
            "Sourness",
            "Bitterness",
            "Savoriness",
            "Spiciness",
          ].map((taste) => (
            <div
              key={taste}
              className="rounded-lg px-3 py-3 text-xl font-semibold flex flex-col items-center justify-center space-y-2"
            >
              <p className="text-xl text-black">{taste}</p>
              <p className="bg-primary w-24 text-ghost rounded-lg px-4 py-2 text-xl text-center">
                {tasteProfile
                  ? tasteProfile[
                      taste.toLowerCase() as keyof typeof tasteProfile
                    ]
                  : 0}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* POST SECTION  */}
      <div className="">
        <hr className="mt-4 mb-4" />
        {/* sample post need da real ones  */}
        <div className="h-20 w-20 bg-slate-200"></div>
      </div>
    </div>
  );
}
