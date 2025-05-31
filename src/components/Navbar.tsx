import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Series", path: "/series" },
    { name: "Tv", path: "/tv" }
  ];

  return (
    <div
      className={`top-0 pt-4 absolute z-10 transition-colors duration-300 font-rajdhani  w-full flex items-center justify-between px-8 `}
    >
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
      <nav>
        <ul className="flex gap-8">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-sm  ${
                    isActive
                      ? "text-primary hover:text-primary/90 transition-colors"
                      : "text-white transition-colors hover:text-white/90"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
