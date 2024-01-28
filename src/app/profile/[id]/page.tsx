"use client";

import { createClient } from "@utils/supabase/client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// UserProfile component prop types
interface UserProfile {
  firstName: string | undefined | null;
  lastName?: string | undefined | null;
  handle?: string | undefined | null;
  bio?: string | undefined | null;
  isCurrentUser?: boolean | undefined | null;
  tasteProfile?: TasteProfile | undefined | null;
  userStats?: UserStats | undefined | null;
}

// Taste profile value types
interface TasteProfile {
  sweetness: number;
  saltiness: number;
  sourness: number;
  bitterness: number;
  savoriness: number;
  spiciness: number;
}

// User statistics value types
interface UserStats {
  recipeCount: number;
  followerCount: number;
  followingCount: number;
}

// UserProfile component
const UserProfileInfo = (props: UserProfile) => {
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="flex flex-row items-center justify-evenly">
      {/* Profile picture, username, handle, and buttons */}
      <div className="flex flex-col items-center">
        <img
          alt={`${props.firstName}'s profile`}
          src="/path-to-profile-image.jpg" // Placeholder for the profile image path
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">
            {props.firstName} {props.lastName}
          </h1>
          <p className="text-gray-500">{props.handle}</p>
        </div>
        {props.isCurrentUser && (
          <div className="flex mt-4 md:mt-0 p-8">
            <button className="bg-green-400 text-white px-4 py-2 rounded-lg mr-2">
              Settings
            </button>
            <button className="bg-green-400 text-white px-4 py-2 rounded-lg">
              Share
            </button>
          </div>
        )}
      </div>

      {/* Stats and Taste Profile */}
      <div className="mt-4 md:mt-0 md:flex md:items-center md:space-x-6 flex-wrap flex-col">
        <div className="flex justify-between space-x-4 m-4 p-2">
          {/* Stats */}
          <div className="text-center m-4 pl-2 pr-2">
            <p className="text-lg font-bold">Recipes</p>
            {/* Number of recipes */}
            <p className="text-base font-bold bg-slate-300 py-1 rounded-lg">
              {props.userStats?.recipeCount}
            </p>
          </div>
          <div className="text-center m-4 pl-2 pr-2">
            <p className="text-lg font-bold">Followers</p>
            {/* Number of followers */}
            <p className="text-base font-bold bg-slate-300 py-1 rounded-lg">
              {props.userStats?.followerCount}
            </p>
          </div>
          <div className="text-center m-4 pl-2 pr-2">
            <p className="text-lg font-bold">Following</p>
            {/* Number of followings */}
            <p className="text-base font-bold bg-slate-300 py-1 rounded-lg">
              {props.userStats?.followingCount}
            </p>
          </div>
        </div>
        <div>{props.bio}</div>
      </div>
      {/* Taste Tags */}
      <div className="flex flex-wrap mt-4 md:mt-0">
        {props.tasteProfile &&
          Object.entries(props.tasteProfile).map(([key, value]) => (
            <div key={key} className="rounded-lg px-1 text-sm font-semibold">
              <p className="text-sm text-black mr-2 mb-2">{capitalize(key)}</p>
              <p className="bg-green-700 text-gray-200 rounded-lg px-3 py-1 text-sm mr-2 mb-2">
                {value}
              </p>
            </div>
          ))}
      </div>
      {/*
      <div className="flex flex-wrap mt-4 md:mt-0">
        {props.tasteProfile?.tastes.map((taste, index) => (
          <div
            key={index}
            className="bg-green-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2"
          >
            #{taste}
          </div>
        ))}
      </div>
      */}
    </div>
  );
};

interface ProfilePageProps {
  isSignedIn: boolean;
}

// Main ProfilePage component
const ProfilePage = ({ isSignedIn }: ProfilePageProps) => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [tasteProfile, setTasteProfile] = useState<
    TasteProfile | undefined | null
  >(undefined);
  const [userStats, setUserStats] = useState<UserStats | undefined>({
    recipeCount: 0,
    followerCount: 0,
    followingCount: 0,
  });

  const [profilePicture, setProfilePicture] = useState<
    string | undefined | null
  >();
  const [firstName, setFirstName] = useState<string | undefined | null>();
  const [lastName, setLastName] = useState<string | undefined | null>();
  const [handle, setHandle] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState<string | undefined>(undefined);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean | undefined>(
    false,
  );

  const supabase = createClient();

  useEffect(() => {
    /* 
    const fetchSession = async () => {
      const session = await supabase.auth.getSession();
      if (session.error) throw session.error;

      setIsCurrentUser(session.data?.user?.id === id)
    };
    */

    /*
    const checkCurrentUser = async () => {
      try {
        const user = await supabase.auth.getUser();
        if (user.error) throw user.error;

        setIsCurrentUser(user.data?.user?.id === id);
        console.log("Is current user: ", isCurrentUser);
      } catch (error) {
        console.log("Error fetching current user: ", error);
      }
    };
    */

    const fetchUserProfile = async () => {
      try {
        const { error, data } = await supabase
          .from("users")
          .select("*")
          .eq("id", id as string)
          .single();
        if (error) throw error;
        else {
          setFirstName(data?.firstName);
          setLastName(data?.lastName);
          //setProfilePicture(data?.profilePicture);

          const user = await supabase.auth.getUser();
          setIsCurrentUser(user.data?.user?.id === id);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
      console.log(firstName, lastName);
    };

    const fetchTasteProfile = async () => {
      try {
        const { error, data } = await supabase
          .from("user_taste_profiles")
          .select(
            "sweetness, saltiness, sourness, bitterness, savoriness, spiciness",
          )
          .eq("user_id", id as string)
          .single();
        if (error) throw error;
        else {
          setTasteProfile(data);
        }
      } catch (error) {
        console.log("Error fetching taste profile:", error);
      }
    };

    const fetchUserStats = async () => {
      /*
      try {
        const { error, data } = await supabase.from("user_stats").select("*").eq("user_id", id).single();
        if (error) throw error;
        else {
          setUserStats(data);
        }
      } catch (error) {
        console.log("Error fetching user stats:", error);
      }
      const userStats = {
        recipeCount: 50,
        followerCount: 50,
        followingCount: 50,
      };
      setUserStats(userStats);
      */
    };

    //checkCurrentUser();
    fetchUserProfile();
    fetchTasteProfile();
    fetchUserStats();
  }, [id, supabase]);

  if (!bio) setBio("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  if (!handle) setHandle("@janedoe");
  if (!firstName) setFirstName("Jane");
  if (!lastName) setLastName("Doe");

  return (
    <div className="p-4 min-h-screen">
      <UserProfileInfo
        isCurrentUser={isCurrentUser}
        firstName={firstName}
        lastName={lastName}
        handle={handle}
        bio={bio}
        tasteProfile={tasteProfile}
        userStats={userStats}
      />
      {/* Posts/Recipes */}
    </div>
  );
};

export default ProfilePage;
