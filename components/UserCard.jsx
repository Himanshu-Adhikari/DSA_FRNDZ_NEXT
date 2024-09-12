import React from 'react';

const UserCard = ({ name, organisation, leetcode, codechef, codeforces, leetcode_name, codechef_name, codeforces_name }) => {
  return (
    <div className="bg-zinc-800 text-white p-6 rounded-lg shadow-lg py-4 m-2">
      {/* User Name with underline */}
      <div className="relative mb-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <svg className="absolute bottom-0 left-0 w-full h-1" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="100%" y2="0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Organisation */}
      <p className="mb-4">Organisation: {organisation}</p>

      {/* Platform Profiles with Profile Name */}
      <div className="space-y-4">
        <div>
          <a href={leetcode} className="text-yellow-400 hover:text-yellow-200 transition-colors">
            LeetCode: <span className="text-yellow-500">{leetcode_name}</span>
          </a>
        </div>
        <div>
          <a href={codechef} className="text-yellow-400 hover:text-yellow-200 transition-colors">
            CodeChef: <span className="text-yellow-500">{codechef_name}</span>
          </a>
        </div>
        <div>
          <a href={codeforces} className="text-yellow-400 hover:text-yellow-200 transition-colors">
            CodeForces: <span className="text-yellow-500">{codeforces_name}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
