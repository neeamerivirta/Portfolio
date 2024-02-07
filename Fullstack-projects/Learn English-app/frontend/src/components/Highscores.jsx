// Frontend: Highscores.jsx
import React, { useState, useEffect } from "react";

/**
 * Functional component representing the Highscores page
 * @date 1/17/2024 - 7:19:13 PM
 **/
const Highscores = () => {
  // State to store the highscores data
  const [highscores, setHighscores] = useState([]);

  // useEffect hook to fetch highscores from the database when the component is loaded
  useEffect(() => {
    // Function to fetch highscores from the API
    const fetchHighscores = async () => {
      try {
        // Making a GET request to the "/api/highscores" endpoint
        const response = await axios.get("/api/highscores");
        // Updating the state with the received highscores data
        setHighscores(response.data);
      } catch (error) {
        // Handling errors if the request fails
        console.error("Error fetching highscores:", error);
      }
    };

    // Invoking the fetchHighscores function
    fetchHighscores();
  }, []);

  return (
    <div>
      <h2>Highscores</h2>
      <p>Here are the highscores from the Learn English!</p>
      {/* Table header for displaying highscores */}
      <table>
        <thead>
          <tr className="header-row">
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
      </table>
      <ul>
        {highscores.map((score) => (
          <li key={score.id}>
            {score.username}: {score.score}
          </li>
        ))}
      </ul>
      {/* Additional information */}
      <h2 style={{ marginBottom: "100px" }}>More updates later!</h2>
    </div>
  );
};

// Exporting the Highscores component as the default export
export default Highscores;
