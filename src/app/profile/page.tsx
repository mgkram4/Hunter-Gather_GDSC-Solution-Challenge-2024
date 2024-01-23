"use client";

import { createClient } from "@utils/supabase/client";
import { useEffect, useState } from "react";

/*
#TODO
- [ ] Display dummy user profile stats
- [ ] Fetch user profile data from Supabase
- [ ] Fetch user taste data from Supabase
- [ ] Display fetched data
- [ ] Figure out the recipes/posts section

#NOTE
  import { createClient } from "@utils/supabase/server";
  or import { createClient } from @utils/supabase/client ?
*/

// Dummy data types
interface UserProfile {
  username: string | undefined;
  handle: string | undefined;
  bio: string | undefined;
  isCurrentUser: boolean | undefined; // Indicates if the profile belongs to the signed-in user
  tasteProfile?: UserTasteProfile;
}

// Dummy data for user's taste profile
interface UserTasteProfile {
  tastes: string[];
}

// UserProfile component
const UserProfileInfo = (props: UserProfile) => {
  return (
    <div className="flex flex-row items-center justify-evenly">
      {/* Profile picture, username, handle, and buttons */}
      <div className="flex flex-col items-center">
        <img
          alt={`${props.username}'s profile`}
          src="/path-to-profile-image.jpg" // Placeholder for the profile image path
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{props.username}</h1>
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
        <div className="flex justify-between space-x-4 m-4 p-2">
          {props.bio}
        </div>
      </div>
      {/* Taste Tags */}
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
    </div>
  );
};

interface ProfilePageProps {
  isSignedIn: boolean;
}

// Main ProfilePage component
const ProfilePage = ({ isSignedIn }: ProfilePageProps) => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [handle, setHandle] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState<string | undefined>(undefined);
  const [tasteProfile, setTasteProfile] = useState<string[]>([]);

  // Supabase data
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { error, data } = await supabase
          .from("users")
          .select("*")
          .eq("id", "41");
        if (error) console.log(error);
        else {
          console.log(data);
          setUsername(data[0].username);
          setHandle(data[0].handle);
          setBio(data[0].bio);
          setProfilePicture(data[0].profilePicture);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  // Dummy user taste profile data
  /*
  const userTasteProfile: UserTasteProfile = {
    tastes: ["Salty", "Spicy", "Sweet"],
  };
  */

  // Dummy user profile data
  /*
  const userProfile: UserProfile = {
    isCurrentUser: true,
    username: "JaneDoe",
    handle: "@janedoe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tasteProfile: userTasteProfile,
  };
  */

  const userProfile: UserProfile = {
    isCurrentUser: false,
    username: username,
    handle: handle,
    bio: bio,
  };

  return (
    <div className="p-4 min-h-screen">
      <UserProfileInfo
        isCurrentUser={userProfile.isCurrentUser}
        username={userProfile.username}
        handle={userProfile.handle}
        bio={userProfile.bio}
        tasteProfile={userProfile.tasteProfile}
      />
      {/* Posts/Recipes */}
    </div>
  );
};

export default ProfilePage;
