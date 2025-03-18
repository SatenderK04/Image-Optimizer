import React from "react";
import "../css/header.css";
import { Link } from "react-router-dom"; // For navigation

const Header = () => {
  return (
    <header className="header">
      <nav className="options">
        <a href="#">Home</a>
        <Link to="/about">About</Link>{" "}
        {/*Link tag prevents full page reloding */}
        <a href="mailto:satenderk1204@gmail.com?subject=Contact%20Me">
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
