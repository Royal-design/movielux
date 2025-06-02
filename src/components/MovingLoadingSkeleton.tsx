import React from "react";

export const MovingLoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="relative h-96 bg-gray-800/10"></div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="w-full h-96 bg-gray-800/10 rounded-lg"></div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 bg-gray-800/10 rounded w-3/4"></div>
            <div className="h-4 bg-gray-800/10 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-800/10 rounded"></div>
              <div className="h-4 bg-gray-800/10 rounded"></div>
              <div className="h-4 bg-gray-800/10 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
