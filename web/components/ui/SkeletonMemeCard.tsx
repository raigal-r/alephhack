import React from 'react';

export default function SkeletonMemeCard() {
  return (
    <div className="flex flex-col items-center justify-center  border-black border rounded p-2 animate-pulse">
      <div className="flex gap-2 w-full">
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      </div>
      <div className="mt-2">
        <div className="h-[95px] w-[95px] bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
