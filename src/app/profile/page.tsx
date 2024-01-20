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
  username: string;
  handle: string;
  bio: string;
  isCurrentUser: boolean; // Indicates if the profile belongs to the signed-in user
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
          alt={`${username}'s profile`}
          src="/path-to-profile-image.jpg" // Placeholder for the profile image path
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-gray-500">{handle}</p>
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
const ProfilePage = () => {
  // Dummy user taste profile data
  const userTasteProfile: UserTasteProfile = {
    tastes: ["Salty", "Spicy", "Sweet"],
  };

  // Dummy user profile data
  const userProfile: UserProfile = {
    username: "JaneDoe",
    handle: "@janedoe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    isCurrentUser: true,
    tasteProfile: userTasteProfile,
  };

  return (
    <div className="p-4 min-h-screen">
      <UserProfileInfo {...userProfile} />
      {/* Posts/Recipes */}
    </div>
  );
};

export default ProfilePage;
