import React from "react";

const TopMembers = ({ users, platform }) => {
  // Sort users by the platform's rating
  const platformKey = `${platform}_rating`; // Dynamic key for platform rating
  const topUsers = [...users]
    .sort((a, b) => b[platformKey] - a[platformKey]) // Sort by the correct platform rating
    .slice(0, 5); // Get top 10 users

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
              <span className="font-bold">
                {index + 1}. {user.Name}<br/> ({user.Organisation})
              </span>
              <span className="font-bold">
                
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
