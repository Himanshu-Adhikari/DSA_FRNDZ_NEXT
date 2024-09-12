import React from "react";

const SkeletonLoader = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="animate-pulse flex space-x-4">
          <div className="bg-zinc-800 h-32 w-24 rounded-md"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-zinc-700 rounded"></div>
            <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
            <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
