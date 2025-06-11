import React, { useState } from "react";
import "../css/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <Link to="/" className="site-title">
        ImageOpt
      </Link>

      <div className="menu-icon" onClick={toggleMenu}>
        &#9776; {/* Unicode hamburger icon */}
      </div>

      <nav className={`options ${menuOpen ? "show" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>
          About
        </Link>
        <a
          href="mailto:satenderk1204@gmail.com?subject=Contact%20Me"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
