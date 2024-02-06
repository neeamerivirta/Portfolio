// Settings.jsx
import React, { useState } from "react";


// Asetukset- komponentti, jokaa ottaa vastaan propseina onThemeChange-funktion
const Settings = ({ onThemeChange }) => {
  // Käytetään Reactin tilanhallinnan hookia, alustetaan selectedTheme "dark"-arvolla
  const [selectedTheme, setSelectedTheme] = useState("dark");

  // Käsitellään teeman vaihto
  const handleThemeChange = (theme) => {
    // Asetetaan uusi valittu teema
    setSelectedTheme(theme);
    // Kutsutaan propseina saatua onThemeChange-funktiota ja välitetään sille uusi teema
    onThemeChange(theme);
  };

  // Renderöinti
  return (
    <div>
      <h2>Asetukset</h2>

      <div>
        <label>
          Valitse teema:
          <select
            value={selectedTheme}
            onChange={(e) => handleThemeChange(e.target.value)}
          >
            <option value="dark">Tumma</option>
            <option value="light">Vaalea</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Settings;
