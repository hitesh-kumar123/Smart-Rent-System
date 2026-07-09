import React from "react";

const EmptyState = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <h2 className="text-lg font-semibold text-neutral-700 mb-2">
        {title}
      </h2>
      <p className="text-sm text-neutral-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
