import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import { cn } from "@/lib/utils";
import { Layout } from "@/layout/Layout";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "Series", path: "/series" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isVisible = useAppSelector((state) => state.navbar.isVisible);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300",
      isActive
        ? "glass text-white"
        : "text-muted hover:text-white hover:bg-white/[0.05]"
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        !isVisible && "opacity-0 pointer-events-none"
      )}
    >
      <div className={cn("transition-all duration-500", isScrolled ? "py-2.5" : "py-4")}>
        <Layout>
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 sm:px-5 transition-all duration-500",
              isScrolled ? "glass py-2 shadow-soft" : "py-2"
            )}
          >
            <Logo />

            <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={linkClass}
                  end={link.path === "/"}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="size-1.5 rounded-full bg-marquee" aria-hidden="true" />
                      )}
                      {link.name}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden size-10 rounded-xl glass flex items-center justify-center text-foreground hover:text-white cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </Layout>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-30 bg-background/95 backdrop-blur-2xl transition-all duration-500",
          isMobileMenuOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        )}
      >
        <div className="flex h-full flex-col px-6 pt-28 pb-10">
          <nav className="flex-1" aria-label="Mobile">
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li
                  key={link.path}
                  className={cn(
                    "transition-all duration-500 ease-out",
                    isMobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  )}
                  style={{ transitionDelay: isMobileMenuOpen ? `${120 + index * 70}ms` : "0ms" }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 font-display text-3xl font-bold tracking-wide transition-colors duration-300 py-3",
                        isActive
                          ? "text-gradient"
                          : "text-muted hover:text-white"
                      )
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-border pt-6 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-subtle">
              Cinema · Curated
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-crimson">
              Est. 2026
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
