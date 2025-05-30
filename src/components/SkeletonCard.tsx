export const SkeletonCard: React.FC = () => (
  <div className="border rounded shadow p-2 flex flex-col items-center animate-pulse">
    <div className="bg-red-300-700 rounded mb-2 w-full h-64"></div>
    <div className="bg-gray-700 rounded w-3/4 h-4 mb-1"></div>
    <div className="bg-gray-700 rounded w-1/2 h-3"></div>
  </div>
);
