import { useEffect, useState } from "react";
import { Search, ArrowUpRight, Menu, X } from "lucide-react";
import "./Navbar.css";

const LINKS = [
  { href: "#stays", label: "Stays" },
  { href: "#experiences", label: "Experiences" },
  { href: "#wellness", label: "Wellness" },
  { href: "#about", label: "About" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  // Close on Escape, and when the viewport grows past the mobile breakpoint
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 761px)");
    const onChange = (e) => e.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <header className={`navbar ${open ? "is-open" : ""}`}>
      {/* Brand */}
      <a href="/" className="navbar-brand">
        <img src="/images/logo.png" alt="Solara Stays" />
      </a>

      {/* Desktop / tablet navigation */}
      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>

      {/* Actions */}
      <div className="nav-actions">
        <button className="search-button" aria-label="Search">
          <Search size={21} strokeWidth={1.5} />
        </button>

        <a href="#booking" className="book-button">
          Book a Stay
          <ArrowUpRight size={16} />
        </a>

        <button
          className="menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <X size={28} strokeWidth={1.5} />
          ) : (
            <Menu size={28} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}

        {/* CTA inside the menu (shown when the header button is hidden on small phones) */}
        <a
          href="#booking"
          className="book-button"
          onClick={() => setOpen(false)}
        >
          Book a Stay
          <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  );
}

export default Navbar;