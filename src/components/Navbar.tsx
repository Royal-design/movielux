import movieLux from "@/assets/movielux.png";
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
      <figure>
        <img src={movieLux} alt="MovieLux Logo" className="h-12" />
      </figure>
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
