"use client";

import { createClient } from "@utils/supabase/client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import defaultpfp from "@public/defaultpfp.png";
//import PostSmall from "../../homepage/post-small";

// UserProfile component prop types
interface UserProfile {
  firstName: string | undefined | null;
  lastName?: string | undefined | null;
  handle?: string | undefined | null;
  bio?: string | undefined | null;
  isCurrentUser?: boolean | undefined | null;
  tasteProfile?: TasteProfile | undefined | null;
  userStats?: UserStats | undefined | null;
  posts?: any;
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
    <div className="flex flex-col">
      {/* Profile picture, username, handle, and buttons */}
      <div className="flex flex-row items-center justify-evenly">
        <div className="flex flex-col items-center">
          <img
            alt={`${props.firstName}'s profile`}
            src="/defaultpfp.png"
            className="w-32 h-32 rounded-full object-cover m-3 p-3"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {props.firstName} {props.lastName}
            </h1>
            <p className="text-secondary">{props.handle?.toLowerCase()}</p>
          </div>
          {props.isCurrentUser && (
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

        {/* Stats and Taste Profile */}
        <div className="mt-4 md:mt-0 md:flex md:items-center md:space-x-6 flex-wrap flex-col">
          <div className="flex justify-between space-x-4 m-4 p-2">
            {/* Stats */}
            <div className="text-center m-4 pl-2 pr-2">
              <p className="text-lg font-bold">Recipes</p>
              {/* Number of recipes */}
              <p className="text-base font-bold bg-ghost py-1 rounded-lg">
                {props.userStats?.recipeCount}
              </p>
            </div>
            <div className="text-center m-4 pl-2 pr-2">
              <p className="text-lg font-bold">Followers</p>
              {/* Number of followers */}
              <p className="text-base font-bold bg-ghost py-1 rounded-lg">
                {props.userStats?.followerCount}
              </p>
            </div>
            <div className="text-center m-4 pl-2 pr-2">
              <p className="text-lg font-bold">Following</p>
              {/* Number of followings */}
              <p className="text-base font-bold bg-ghost py-1 rounded-lg">
                {props.userStats?.followingCount}
              </p>
            </div>
          </div>
        </div>
        {/* Taste Tags */}
        <div className="flex mt-4 md:mt-0">
          {props.tasteProfile &&
            Object.entries(props.tasteProfile).map(([key, value]) => (
              <div key={key} className="rounded-lg px-1 text-sm font-semibold">
                <p className="text-sm text-black mr-2 mb-2">
                  {capitalize(key)}
                </p>
                <p className="bg-primary text-ghost rounded-lg px-3 py-1 text-sm mr-2 mb-2 text-center">
                  {value}
                </p>
              </div>
            ))}
        </div>
      </div>
      <hr className="h-px my-10 bg-primary border-0"></hr>
    </div>
  );
};

// Main ProfilePage component
const ProfilePage = () => {
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
  const [firstName, setFirstName] = useState<string | undefined | null>("");
  const [lastName, setLastName] = useState<string | undefined | null>("");
  const [handle, setHandle] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState<string | undefined>(undefined);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean | undefined>(
    false,
  );
  const [profilePictureUrl, setProfilePictureUrl] = useState<
    string | undefined | null
  >();
  const [posts, setPosts] = useState<any>();

  const supabase = createClient();

  useEffect(() => {
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
          setIsCurrentUser(user.data?.user?.email === data?.email);
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

    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .eq("user_id", id as string);
        if (error) throw error;
        setPosts(data);
      } catch (error) {
        console.log("Error fetching user posts:", error);
      }
    };

    fetchUserProfile();
    fetchTasteProfile();
    fetchPosts();
  }, [id, supabase]);

  if (!bio) setBio("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  if (!handle && firstName && lastName)
    setHandle(firstName?.charAt(0) + lastName);

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
        posts={posts}
        //profilePicture={profilePicture}
      />
    </div>
  );
};

export default ProfilePage;
