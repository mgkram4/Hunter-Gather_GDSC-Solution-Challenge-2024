"use client";

import { createClient } from "@utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Dummy data types
interface UserProfile {
  firstName: string | undefined | null;
  lastName?: string | undefined | null;
  handle?: string | undefined;
  bio?: string | undefined;
  isCurrentUser?: boolean | undefined; // Indicates if the profile belongs to the signed-in user
  tasteProfile?: UserTasteProfile;
}

// Dummy data for user's taste profile
interface UserTasteProfile {
  tastes: string[];
}

// UserProfile component
const UserProfileInfo = ({
  username,
  handle,
  bio,
  isCurrentUser,
  tasteProfile,
}: UserProfile) => {
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
        {isCurrentUser && (
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
            <p className="text-base font-bold">{}</p>
          </div>
          <div className="text-center m-4 pl-2 pr-2">
            <p className="text-lg font-bold">Followers</p>
            {/* Number of followers */}
          </div>
          <div className="text-center m-4 pl-2 pr-2">
            <p className="text-lg font-bold">Following</p>
            {/* Number of followings */}
          </div>
        </div>
        <div className="flex justify-between space-x-4 m-4 p-2">{bio}</div>
      </div>
      {/* Taste Tags */}
      <div className="flex flex-wrap mt-4 md:mt-0">
        {tasteProfile?.tastes.map((taste, index) => (
          <div
            key={index}
            className="bg-green-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2"
          >
            #{taste}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main ProfilePage component
const ProfilePage = ({ isSignedIn }: ProfilePageProps) => {
  const router = useRouter();
  const { id } = router.query;

  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<
    string | undefined | null
  >();
  const [firstName, setFirstName] = useState<string | undefined | null>();
  const [lastName, setLastName] = useState<string | undefined | null>();
  const [handle, setHandle] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState<string | undefined>(undefined);
  const [tasteProfile, setTasteProfile] = useState<string[]>([]);

  const supabase = createClient();

  useEffect(() => {
    /* 
    const fetchSession = async () => {
      const session = await supabase.auth.getSession();
      if (session.error) throw session.error;

      setIsCurrentUser(session.data?.user?.id === id)
    };
    */

    const checkCurrentUser = async () => {
      try {
        const user = await supabase.auth.getUser();
        if (user.error) throw user.error;

        setIsCurrentUser(user.data?.user?.id === id);
      } catch (error) {
        console.log("Error fetching current user: ", error);
      }
    };

    const fetchUserProfile = async (uId: string) => {
      try {
        const { error, data } = await supabase
          .from("users")
          .select("*")
          .eq("id", uId)
          .single();
        if (error) throw error;

        setFirstName(data?.firstName);
        setLastName(data?.lastName);
      } catch (error) {
        console.log(error);
      }
    };

    checkCurrentUser();
    if (id) fetchUserProfile(id as string);
  }, [id, supabase]);

  if (!bio) setBio("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  if (!handle) setHandle("@janedoe");

  return (
    <div className="p-4 min-h-screen">
      <UserProfileInfo
        isCurrentUser={isCurrentUser}
        firstName={firstName}
        lastName={lastName}
        handle={handle}
        bio={bio}
      />
      {/* Posts/Recipes */}
    </div>
  );
};

export default ProfilePage;
