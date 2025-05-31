import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Series", path: "/series" },
    { name: "TV Shows", path: "/tv" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-rajdhani w-full ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md py-2 shadow-lg"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-red via-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-red-500/25 transition-shadow duration-300">
              <svg
                className="w-6 h-6 text-white transform hover:scale-110 transition-transform duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
              </svg>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-primary-red to-red-600 rounded-xl blur opacity-30 animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary-red via-red-500 to-red-400 bg-clip-text text-transparent hover:from-red-400 hover:to-primary-red transition-all duration-300">
              Movilux
            </h2>
            <div className="h-0.5 bg-gradient-to-r from-primary-red to-transparent w-0 hover:w-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link, _) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                      isActive
                        ? " bg-primary-red/60 shadow-lg shadow-red-500/20 text-white"
                        : "text-white hover:text-primary-red hover:bg-white/20"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.name}</span>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-red/20 to-red-500/20 rounded-lg"></div>
                      )}
                      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-red to-red-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden relative w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
          aria-label="Toggle mobile menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-6">
          <nav>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                        isActive
                          ? "text-primary-red bg-red-500/10 border border-red-500/20"
                          : "text-white hover:text-primary-red hover:bg-white/5"
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
      </div>
    </div>
  );
};
