// import { useState } from "react";
// import {
//   ArrowLeft,
//   Play,
//   Star,
//   Calendar,
//   Clock,
//   Globe,
//   Heart,
//   Share2,
//   Bookmark,
//   X
// } from "lucide-react";

// // Mock data - replace with your actual API call
// const mockMovieData = {
//   id: 1,
//   title: "Guardians of the Galaxy Vol. 3",
//   overview:
//     "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.",
//   poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
//   backdrop_path: "/5YZbUmjbMa3ClvSW1Wj3Gdx5C3s.jpg",
//   release_date: "2023-05-03",
//   runtime: 150,
//   vote_average: 8.1,
//   vote_count: 4521,
//   genres: [
//     { id: 28, name: "Action" },
//     { id: 12, name: "Adventure" },
//     { id: 878, name: "Science Fiction" }
//   ],
//   production_companies: [
//     { id: 420, name: "Marvel Studios" },
//     { id: 7505, name: "Kevin Feige Productions" }
//   ],
//   spoken_languages: [{ iso_639_1: "en", name: "English" }],
//   budget: 250000000,
//   revenue: 845555777
// };

// const mockTrailer = {
//   key: "u3V5KDHRutA",
//   site: "YouTube",
//   type: "Trailer",
//   name: "Official Trailer"
// };

// export const MovieDetail = () => {
//   const [showTrailer, setShowTrailer] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const movie = mockMovieData;
//   const trailer = mockTrailer;

//   const formatRuntime = (minutes) => {
//     const hours = Math.floor(minutes / 60);
//     const mins = minutes % 60;
//     return `${hours}h ${mins}m`;
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       notation: "compact"
//     }).format(amount);
//   };

//   return (
//     <div className="min-h-screen bg-black text-white relative overflow-hidden">
//       {/* Background Image with Gradient Overlay */}
//       <div className="absolute inset-0">
//         <img
//           src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
//           alt={movie.title}
//           className="w-full h-full object-cover"
//           onLoad={() => setImageLoaded(true)}
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>

//         {/* Loading overlay */}
//         {!imageLoaded && (
//           <div className="absolute inset-0 bg-black flex items-center justify-center">
//             <div className="w-12 h-12 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="relative z-10">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6">
//           <button
//             onClick={() => window.history.back()}
//             className="flex items-center gap-2 text-white hover:text-red-400 transition-colors group"
//           >
//             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//             <span className="hidden sm:inline">Back</span>
//           </button>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsLiked(!isLiked);
//               }}
//               className={`p-2 rounded-full transition-all transform hover:scale-110 ${
//                 isLiked
//                   ? "bg-red-600 text-white shadow-lg shadow-red-500/25"
//                   : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
//               }`}
//             >
//               <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsBookmarked(!isBookmarked);
//               }}
//               className={`p-2 rounded-full transition-all transform hover:scale-110 ${
//                 isBookmarked
//                   ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
//                   : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
//               }`}
//             >
//               <Bookmark
//                 className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
//               />
//             </button>
//             <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all transform hover:scale-110">
//               <Share2 className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="container mx-auto px-6 pb-12">
//           <div className="grid lg:grid-cols-3 gap-12 items-start">
//             {/* Poster */}
//             <div className="lg:col-span-1">
//               <div className="relative group max-w-sm mx-auto lg:mx-0">
//                 <div className="relative overflow-hidden rounded-2xl shadow-2xl">
//                   <img
//                     src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                     alt={movie.title}
//                     className="w-full group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                   {/* Trailer Button Overlay */}
//                   {trailer && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setShowTrailer(true);
//                       }}
//                       className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     >
//                       <div className="bg-red-600 hover:bg-red-500 rounded-full p-6 transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
//                         <Play className="text-white w-8 h-8 ml-1" />
//                       </div>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Movie Info */}
//             <div className="lg:col-span-2 space-y-8">
//               {/* Title and Rating */}
//               <div className="space-y-6">
//                 <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
//                   {movie.title}
//                 </h1>

//                 <div className="flex flex-wrap items-center gap-6 text-sm">
//                   <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-500/30">
//                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                     <span className="font-semibold text-white">
//                       {movie.vote_average.toFixed(1)}
//                     </span>
//                     <span className="text-gray-400">
//                       ({movie.vote_count.toLocaleString()})
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2 text-gray-300 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2">
//                     <Calendar className="w-4 h-4 text-blue-400" />
//                     <span>{new Date(movie.release_date).getFullYear()}</span>
//                   </div>

//                   <div className="flex items-center gap-2 text-gray-300 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2">
//                     <Clock className="w-4 h-4 text-green-400" />
//                     <span>{formatRuntime(movie.runtime)}</span>
//                   </div>

//                   <div className="flex items-center gap-2 text-gray-300 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2">
//                     <Globe className="w-4 h-4 text-purple-400" />
//                     <span>{movie.spoken_languages[0]?.name}</span>
//                   </div>
//                 </div>

//                 {/* Genres */}
//                 <div className="flex flex-wrap gap-3">
//                   {movie.genres.map((genre, index) => (
//                     <span
//                       key={genre.id}
//                       className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 cursor-pointer ${
//                         index % 3 === 0
//                           ? "bg-red-600/20 border border-red-600/40 text-red-300 hover:bg-red-600/30"
//                           : index % 3 === 1
//                           ? "bg-blue-600/20 border border-blue-600/40 text-blue-300 hover:bg-blue-600/30"
//                           : "bg-purple-600/20 border border-purple-600/40 text-purple-300 hover:bg-purple-600/30"
//                       }`}
//                     >
//                       {genre.name}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Rating Progress Bar */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-400">Rating</span>
//                     <span className="text-white font-medium">
//                       {movie.vote_average.toFixed(1)}/10
//                     </span>
//                   </div>
//                   <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-1000 ease-out"
//                       style={{ width: `${(movie.vote_average / 10) * 100}%` }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Overview */}
//               <div className="space-y-4">
//                 <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                   Overview
//                 </h2>
//                 <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
//                   {movie.overview}
//                 </p>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-wrap gap-4">
//                 {trailer && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setShowTrailer(true);
//                     }}
//                     className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
//                   >
//                     <Play className="w-5 h-5" />
//                     Watch Trailer
//                   </button>
//                 )}

//                 <button className="flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-4 rounded-xl font-semibold transition-all border border-white/20 hover:border-white/40 transform hover:scale-105">
//                   <Heart className="w-5 h-5" />
//                   Add to Favorites
//                 </button>
//               </div>

//               {/* Production Info */}
//               <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-800">
//                 <div className="space-y-4">
//                   <h3 className="text-xl font-semibold text-gray-200">
//                     Production
//                   </h3>
//                   <div className="space-y-3">
//                     {movie.production_companies.map((company) => (
//                       <div
//                         key={company.id}
//                         className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
//                       >
//                         <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                         <p className="text-gray-300 font-medium">
//                           {company.name}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <h3 className="text-xl font-semibold text-gray-200">
//                     Box Office
//                   </h3>
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-center p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
//                       <span className="text-gray-400">Budget</span>
//                       <span className="text-white font-semibold">
//                         {formatCurrency(movie.budget)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
//                       <span className="text-gray-400">Revenue</span>
//                       <span className="text-green-400 font-semibold">
//                         {formatCurrency(movie.revenue)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Trailer Modal */}
//       {showTrailer && trailer && (
//         <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setShowTrailer(false);
//               }}
//               className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-red-600 rounded-full p-3 transition-all transform hover:scale-110"
//             >
//               <X className="w-6 h-6" />
//             </button>
//             <iframe
//               src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
//               title="Movie Trailer"
//               allow="autoplay; encrypted-media"
//               allowFullScreen
//               className="w-full h-full"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
