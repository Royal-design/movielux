import React from "react";

export const MovieErrorMessage: React.FC<{ message: string }> = ({
  message
}) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  );
};
