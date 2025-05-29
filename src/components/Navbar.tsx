import movieLux from "@/assets/movielux.png";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [bgBackdrop, setBgBackdrop] = useState<boolean>(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Series", path: "/series" },
    { name: "Tv", path: "/tv" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setBgBackdrop(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`top-0  absolute z-10 transition-colors duration-300 font-titillium ${
        bgBackdrop ? " backdrop-blur-2xl" : ""
      } h-12 w-full flex items-center justify-between px-8`}
    >
      <figure>
        <img src={movieLux} alt="MovieLux Logo" className="h-8" />
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
                      ? "text-red-600 hover:text-red-500 transition-colors"
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
