import React from "react";

export const BoxOffice: React.FC<{ budget: number; revenue: number }> = ({
  budget,
  revenue
}) => {
  if (!budget && !revenue) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {budget > 0 && (
        <div className="bg-gray-900/40 border border-gray-700/30 p-6 rounded-lg hover:bg-gray-800/40 transition-colors">
          <h4 className="text-lg font-semibold text-white mb-2">Budget</h4>
          <p className="text-2xl font-bold text-emerald-400">
            ${budget.toLocaleString()}
          </p>
        </div>
      )}
      {revenue > 0 && (
        <div className="bg-gray-900/40 border border-gray-700/30 p-6 rounded-lg hover:bg-gray-800/40 transition-colors">
          <h4 className="text-lg font-semibold text-white mb-2">Box Office</h4>
          <p className="text-2xl font-bold text-blue-400">
            ${revenue.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};
