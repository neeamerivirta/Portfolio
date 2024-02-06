// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Settings from "./components/Settings";
import TimeTracking from "./components/TimeTracking";

const App = () => {
  const [theme, setTheme] = useState("light");

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);

    const root = document.documentElement;
    if (newTheme === "light") {
      root.style.setProperty("--color", "#213547");
      root.style.setProperty("--background-color", "#ffffff");
      root.style.setProperty("--nav-background-color", "#e0e0e0");
      root.style.setProperty("--ul-background-color", "#f0f0f0");
    } else {
      root.style.setProperty("--color", "rgba(255, 255, 255, 0.87)");
      root.style.setProperty("--background-color", "#303030");
      root.style.setProperty("--nav-background-color", "#202020");
      root.style.setProperty("--ul-background-color", "#404040");
    }
  };

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Etusivu</Link>
          </li>
          <li>
            <Link to="/about">Info</Link>
          </li>
          <li>
            <Link to="/timetracking">Muuta</Link>
          </li>
          <li>
            <Link to="/settings">Asetukset</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route path="/about" element={<About theme={theme} />} />
        <Route path="/timetracking" element={<TimeTracking theme={theme} />} />
        <Route
          path="/settings"
          element={<Settings onThemeChange={handleThemeChange} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
