// Dummy data types
interface UserProfile {
  username: string;
  handle: string;
  bio: string;
  isCurrentUser: boolean; // Indicates if the profile belongs to the signed-in user
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
        <div>{/* Map and display tastes */}</div>
        {/* Bio/Description section */}
        <div className="mt-4">
          <p>{bio}</p>
        </div>
      </div>
    </div>
  );
};

// Main ProfilePage component
const ProfilePage = () => {
  // Dummy user profile data
  const userProfile: UserProfile = {
    username: "JaneDoe",
    handle: "@janedoe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    isCurrentUser: true, // This should be determined by your auth logic
  };

  // Dummy user taste profile data
  const userTasteProfile: UserTasteProfile = {
    tastes: ["Salty", "Spicy", "Sweet"], // Replace with actual data
  };

  return (
    <main className="p-4">
      <UserProfileInfo {...userProfile} />
      {/* User's Taste Profile */}
      <div className="mt-4">
        {userTasteProfile.tastes.map((taste, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            #{taste}
          </span>
        ))}
      </div>
      {/* Bio/Description and the rest of the profile content */}
      {/* ... */}
    </main>
  );
};

export default ProfilePage;
