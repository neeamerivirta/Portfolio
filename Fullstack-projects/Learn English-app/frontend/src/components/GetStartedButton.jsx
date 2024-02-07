// GetStartedButton.jsx
// Importing React and the Link component from react-router-dom
import React from "react";
import { Link } from "react-router-dom";

/**
 * Functional component representing the Get started button
 * @date 1/17/2024 - 7:18:27 PM
 **/

const GetStartedButton = () => {
  return (
    // Link component to navigate to the "/learn" route
    <Link to="/learn" style={{ paddingLeft: "40px", margin: "10px" }}>
      <button>Get Started</button>
    </Link>
  );
};

// Exporting the GetStartedButton as the default export
export default GetStartedButton;
