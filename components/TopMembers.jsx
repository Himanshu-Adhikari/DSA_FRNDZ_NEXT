import React from "react";

const TopMembers = ({ users, platform }) => {
  // Sort users by the platform's rating
  const platformKey = `${platform}_rating`; // Dynamic key for platform rating
  const topUsers = [...users]
    .sort((a, b) => b[platformKey] - a[platformKey]) // Sort by the correct platform rating
    .slice(0, 3); // Get top 10 users

  return (
    <div className="bg-zinc-800 p-6 rounded-md shadow-lg">
      <ul className="space-y-2">
        {topUsers.length === 0 ? (
          <p className="text-white">No data available</p>
        ) : (
          topUsers.map((user, index) => (
            <li
              key={user.$id}
              className="flex justify-between bg-zinc-900 p-3 rounded-md text-white"
            >
              <span>
                {index + 1}. {user.Name} ({user.Organisation})
              </span>
              <span>
                {platform.charAt(0).toUpperCase() + platform.slice(1)} Rating:{" "}
                {user[platformKey]}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TopMembers;
