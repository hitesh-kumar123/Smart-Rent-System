import React from "react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-500 border-solid mb-4"></div>
      <p className="text-neutral-600 text-sm">{message}</p>
    </div>
  );
};

export default Loading;
