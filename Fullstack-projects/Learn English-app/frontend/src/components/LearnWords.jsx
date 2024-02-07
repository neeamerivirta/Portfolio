// Frontend: LearnWords.jsx
import React, { useState, useEffect } from "react";

/**
 * Functional component representing the LearnWords page
 * @date 1/17/2024 - 7:19:28 PM
 **/
const LearnWords = () => {
  // State to store the word pairs data
  const [wordPairs, setWordPairs] = useState([]);
  // State to store user answers
  const [userAnswers, setUserAnswers] = useState({});
  // State to store the score
  const [score, setScore] = useState(0);

  // useEffect hook to fetch word pairs from the server when the component is loaded
  useEffect(() => {
    fetchWordPairs();
  }, []);

  // Function to fetch word pairs from the server
  const fetchWordPairs = async () => {
    try {
      // Making a GET request to the "/api/word_pairs" endpoint
      const response = await fetch("http://localhost:8080/api/word_pairs");
      // Logging server response for debugging, these was useful!
      console.log("Server response:", response);

      // Handling errors if response isn't succesful
      if (!response.ok) {
        throw new Error(
          `Error fetching word pairs: ${response.status} - ${response.statusText}`
        );
      }

      // Parsing the JSON data from the response
      const data = await response.json();
      console.log("Received data:", data);

      // Updating the state with the received word pairs data
      setWordPairs(data);
    } catch (error) {
      // Handling fetch errors and displaying an alert
      console.error("Fetch error:", error);
      alert("Error fetching word pairs. Please try again later.");
    }
  };

  // Logging the current wordPairs stata for debugging
  console.log("Word pairs state:", wordPairs);

  // Handling changes in user answers
  const handleAnswerChange = (word, event) => {
    setUserAnswers({ ...userAnswers, [word]: event.target.value });
  };

  // Checking the answers and updating the score
  const handleCheckAnswers = () => {
    let newScore = 0;
    // Checking each word pair
    wordPairs.forEach((pair) => {
      if (
        userAnswers[pair.english] &&
        userAnswers[pair.english].toLowerCase() === pair.finnish.toLowerCase()
      ) {
        newScore++;
      }
    });
    // Updating the score state
    setScore(newScore);
    // Displaying an alert with user's score
    alert(`You got ${newScore} out of ${wordPairs.length} correct!`);
  };

  // Rendering the LearnWords component
  return (
    <div>
      <h2>Learn English Words</h2>
      <p>Translate the following English words to Finnish:</p>
      <p>The table will take a while to load.</p>
      {/* Table to display word pairs and input fields for user answers */}
      <table>
        <thead>
          <tr className="header-row">
            <th>Id</th>
            <th>English 🇬🇧</th>
            <th>Finnish 🇫🇮</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through wordPairs and rendering each pair */}
          {wordPairs.map((pair) => (
            <tr key={pair.id}>
              <td>{pair.id}</td>
              <td>{pair.english} </td>
              <td>
                {/* Input field for user answers with onChange handler */}
                <input
                  type="text"
                  value={userAnswers[pair.english] || ""}
                  onChange={(event) => handleAnswerChange(pair.english, event)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to check answers */}
      <button onClick={handleCheckAnswers}>Check Answers</button>
      {/* Displaying the current score */}
      <h2>Score: {score}</h2>
    </div>
  );
};

// Exporting the LearnWords component as the default export
export default LearnWords;
