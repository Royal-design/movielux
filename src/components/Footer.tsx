import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    movies: [
      { name: "Popular Movies", href: "/movies/popular" },
      { name: "Upcoming Movies", href: "/movies/upcoming" },
      { name: "Top Rated Movies", href: "/movies/top-rated" },
      { name: "Now Playing", href: "/movies/now-playing" }
    ],
    tvShows: [
      { name: "Popular TV Shows", href: "/tv/popular" },
      { name: "Airing Today", href: "/tv/airing-today" },
      { name: "On The Air", href: "/tv/on-the-air" },
      { name: "Top Rated TV", href: "/tv/top-rated" }
    ],
    discover: [
      { name: "Trending", href: "/trending" },
      { name: "People", href: "/people" },
      { name: "Collections", href: "/collections" },
      { name: "Genres", href: "/genres" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" }
    ]
  };

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/movilux",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: "Facebook",
      href: "https://facebook.com/movilux",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      name: "Instagram",
      href: "https://instagram.com/movilux",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.321-1.295C4.198 14.553 3.5 13.026 3.5 11.316c0-1.71.698-3.237 1.628-4.377.873-.805 2.024-1.295 3.321-1.295 1.297 0 2.448.49 3.321 1.295.93 1.14 1.628 2.667 1.628 4.377 0 1.71-.698 3.237-1.628 4.377-.873.805-2.024 1.295-3.321 1.295zm7.068 0c-1.297 0-2.448-.49-3.321-1.295-.93-1.14-1.628-2.667-1.628-4.377 0-1.71.698-3.237 1.628-4.377.873-.805 2.024-1.295 3.321-1.295 1.297 0 2.448.49 3.321 1.295.93 1.14 1.628 2.667 1.628 4.377 0 1.71-.698 3.237-1.628 4.377-.873.805-2.024 1.295-3.321 1.295z" />
        </svg>
      )
    },
    {
      name: "YouTube",
      href: "https://youtube.com/movilux",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-gradient-to-t from-black via-zinc-950 to-zinc-900 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-red to-primary-red/80 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-red to-primary-red/70 bg-clip-text text-transparent">
                  Movilux
                </h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Your ultimate destination for movies, TV shows, and
                entertainment. Discover, explore, and enjoy the world of cinema.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-zinc-800 hover:bg-primary-red rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Movies */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-red">
                Movies
              </h3>
              <ul className="space-y-2">
                {footerLinks.movies.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        cn(
                          "text-sm transition-colors duration-200 hover:translate-x-1 inline-block",
                          isActive
                            ? "text-primary-red font-medium"
                            : "text-zinc-400 hover:text-white"
                        )
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* TV Shows */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-red">
                TV Shows
              </h3>
              <ul className="space-y-2">
                {footerLinks.tvShows.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        cn(
                          "text-sm transition-colors duration-200 hover:translate-x-1 inline-block",
                          isActive
                            ? "text-primary-red font-medium"
                            : "text-zinc-400 hover:text-white"
                        )
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discover */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-red">
                Discover
              </h3>
              <ul className="space-y-2">
                {footerLinks.discover.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        cn(
                          "text-sm transition-colors duration-200 hover:translate-x-1 inline-block",
                          isActive
                            ? "text-primary-red font-medium"
                            : "text-zinc-400 hover:text-white"
                        )
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-red">
                Company
              </h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        cn(
                          "text-sm transition-colors duration-200 hover:translate-x-1 inline-block",
                          isActive
                            ? "text-primary-red font-medium"
                            : "text-zinc-400 hover:text-white"
                        )
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-zinc-400">
              <p>&copy; {currentYear} Movilux. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <a
                  href="/privacy"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <span>•</span>
                <a
                  href="/terms"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </a>
                <span>•</span>
                <a
                  href="/cookies"
                  className="hover:text-white transition-colors duration-200"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
            <div className="text-sm text-zinc-400">
              Made with ❤️ by Emmanuel for movie lovers
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
