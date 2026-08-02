import { Layout } from "@/layout/Layout";
import { Logo } from "./Logo";
import { NavLink } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    movies: [
      { name: "Popular Movies", href: "/movies" },
      { name: "Trending Movies", href: "/movies" },
      { name: "Top Rated Movies", href: "/movies" },
      { name: "Now Playing", href: "/movies" },
    ],
    tvShows: [
      { name: "Popular TV Shows", href: "/series" },
      { name: "Top Rated TV", href: "/series" },
      { name: "Trending Series", href: "/series" },
      { name: "On The Air", href: "/series" },
    ],
    discover: [
      { name: "Home", href: "/" },
      { name: "Movies", href: "/movies" },
      { name: "Series", href: "/series" },
      { name: "Genres", href: "/movies" },
    ],
    company: [
      { name: "About", href: "/" },
      { name: "Contact", href: "/" },
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com/movielux", icon: Twitter },
    { name: "Facebook", href: "https://facebook.com/movielux", icon: Facebook },
    { name: "Instagram", href: "https://instagram.com/movielux", icon: Instagram },
    { name: "YouTube", href: "https://youtube.com/movielux", icon: Youtube },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-surface/40">
      {/* ambient marquee glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-crimson/10 blur-3xl"
        aria-hidden="true"
      />

      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 py-14 lg:py-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Your curated destination for cinema. Discover trending films,
              acclaimed series, trailers and box office — all in one
              luxurious place.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex size-10 items-center justify-center rounded-xl border border-border bg-white/[0.03] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson/40 hover:text-crimson"
                >
                  <social.icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-subtle">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-white"
                    >
                      <span className="h-px w-0 bg-marquee transition-all duration-300 group-hover:w-3" aria-hidden="true" />
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border py-6">
          <p className="font-mono text-xs text-subtle">
            © {currentYear} MovieLux. All rights reserved.
          </p>
          <div className="flex items-center gap-2 font-mono text-xs text-subtle">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
            Crafted for cinephiles, one frame at a time.
          </div>
        </div>
      </Layout>
    </footer>
  );
};
