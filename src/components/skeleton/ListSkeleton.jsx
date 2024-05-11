import React from "react";

const ListSkeleton = () => {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-4 animate-pulse">
        <h3 className="bg-gray-200 rounded h-7 w-44"></h3>
        <div className="flex items-end justify-end w-full h-32 p-3 bg-gray-200 rounded">
          <button className="h-10 bg-gray-300 rounded w-36"></button>
        </div>
        <div className="flex items-end justify-end w-full h-32 p-3 bg-gray-200 rounded">
          <button className="h-10 bg-gray-300 rounded w-36"></button>
        </div>
        <div className="flex items-end justify-end w-full h-32 p-3 bg-gray-200 rounded">
          <button className="h-10 bg-gray-300 rounded w-36"></button>
        </div>
      </div>
      <div className="flex flex-col gap-4 animate-pulse">
        <h3 className="bg-gray-200 rounded h-7 w-44"></h3>
        <div className="flex items-end justify-end w-full h-32 p-3 bg-gray-200 rounded">
          <button className="h-10 bg-gray-300 rounded w-36"></button>
        </div>
        <div className="flex items-end justify-end w-full h-32 p-3 bg-gray-200 rounded">
          <button className="h-10 bg-gray-300 rounded w-36"></button>
        </div>
        <div className="flex items-end justify-end w-full h-32 p-3 bg-gray-200 rounded">
          <button className="h-10 bg-gray-300 rounded w-36"></button>
        </div>
      </div>
    </div>
  );
};

export default ListSkeleton;
