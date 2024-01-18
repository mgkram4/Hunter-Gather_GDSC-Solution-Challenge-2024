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
    <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
      <div className="space-y-3">
        {/* Profile picture, username and handle */}
        <img
          alt={`${username}'s profile`}
          className="w-24 h-24 rounded-full object-cover"
        />
        <h1 className="text-xl font-bold">{username}</h1>
        <p className="text-gray-500">{handle}</p>
        {/* Settings and Share buttons, conditionally rendered */}
        {isCurrentUser && (
          <div className="flex space-x-2">
            <button className="bg-green-400 text-white px-4 py-2 rounded-lg">
              Settings
            </button>
            <button className="bg-green-400 text-white px-4 py-2 rounded-lg">
              Share
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-3">
        {/* Recipe, Followers, and Following displays/buttons */}
        <div className="flex justify-between">
          <div className="text-center">
            <p className="text-lg font-bold">Recipes</p>
            {/* Number of recipes */}
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">Followers</p>
            {/* Number of followers */}
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">Following</p>
            {/* Number of followings */}
          </div>
        </div>
        {/* Creator Taste Profile */}
        <div className="mt-4">
          {tasteProfile &&
            tasteProfile.tastes.map((taste, index) => (
              <div
                key={index}
                className="inline-block bg-green-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2"
              >
                #{taste}
              </div>
            ))}
        </div>
        {/* Bio/Description section */}
        <div className="mt-4">
          <p>{bio}</p>
        </div>
      </div>
    </div>
  );
};

// Main ProfilePage component
export const ProfilePage = () => {
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
    <div className="p-4">
      <UserProfileInfo {...userProfile} />
      {/* Posts/Recipes */}
    </div>
  );
};
