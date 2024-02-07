// Header.jsx
import React from "react";
import logo from "./logo.png"; // Importing the logo image
import { Link } from "react-router-dom";
import "./Header.css"; // Importing the associated CSS file for styling

/**
 * Functional component representing the Header
 * @date 1/17/2024 - 7:18:53 PM
 **/

const Header = () => {
  return (
    <header>
      {/* Navigation menu */}
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Frontpage</Link>
          </li>
          <li>
            <Link to="/learn">Learn!</Link>
          </li>
          <li>
            <Link to="/highscores">Highscores</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>

      {/* Logo image */}
      <img
        src={logo}
        alt="Logo"
        style={{ width: "100px", marginBottom: "-40px" }}
      />
      {/* Heading and description */}
      <h1>Learn English!</h1>
      <p>Train your English grammar skills with fun exercises!</p>
    </header>
  );
};

// Exporting the Header component as the default export
export default Header;
