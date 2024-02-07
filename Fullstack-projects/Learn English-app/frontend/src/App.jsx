// Frontend: App.jsx
// Importing React and necessary components and modules from react-router-dom
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importing custom components
import Header from "./components/Header";
import Features from "./components/Features";
import GetStartedButton from "./components/GetStartedButton";
import Footer from "./components/Footer";
import LearnWords from "./components/LearnWords";
import Admin from "./components/Admin";
import Highscores from "./components/Highscores";

// Functional component representing the main App
const App = () => {
  return (
    <Router>
      <div>
        <Header />
        {/* React Router Routes for handling different paths */}
        <Routes>
          <Route path="/learn" element={<LearnWords />} />
          <Route path="/highscores" element={<Highscores />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/"
            element={
              <>
                <Features />
                <GetStartedButton />
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

// Exporting the App component as the default export
export default App;
