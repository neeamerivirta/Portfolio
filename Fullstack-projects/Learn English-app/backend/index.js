// Backend: index.js
// Load environment variables from a file named .env
require("dotenv").config();

/**
 * Import required modules
 * @date 1/17/2024 - 7:14:26 PM
 *
 * @type {*}
 */
const express = require("express");
/**
 * Import required modules
 * @date 1/17/2024 - 7:14:26 PM
 *
 * @type {*}
 */
const cors = require("cors");
/**
 * Import required modules
 * @date 1/17/2024 - 7:14:26 PM
 *
 * @type {*}
 */
const mysql = require("mysql");
/**
 * Import required modules
 * @date 1/17/2024 - 7:14:26 PM
 *
 * @type {*}
 */
const app = express();
/**
 * Import required modules
 * @date 1/17/2024 - 7:14:26 PM
 *
 * @type {*}
 */
const wordPairsRouter = require("./wordPairs"); // Assuming this is a router for specific word pair routes

/**
 * Set up MySQL connection pool
 * @date 1/17/2024 - 7:14:26 PM
 *
 * @type {8080}
 */
const port = 8080;

/**
 * MySQL connection
 * @date 1/17/2024 - 7:14:26 PM
 *
 * @type {*}
 */
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

// Middleware setup for Express
app.use(express.json()); // Parse JSON bodies in incoming request
app.use(express.static("./frontend")); // Serve static files from the specified directory
app.use(cors());

// Routes for handling word pairs

// GET all word pairs from database
app.get("/api/word_pairs", (req, res) => {
  const query = "SELECT * FROM word_pairs";
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});

// GET a specific word pair by ID
app.get("/api/word_pairs/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM word_pairs WHERE id = ?";
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});

// DELETE a word pair by ID
app.delete("/api/word_pairs/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM word_pairs WHERE id = ?";
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error deleting word pair:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json({ message: "Word pair deleted successfully" });
  });
});

// POST a new word pair
app.post("/api/word_pairs", (req, res) => {
  const { english, finnish } = req.body;

  // Check that both "English" and "Finnish" fields are provided
  if (!english || !finnish) {
    return res
      .status(400)
      .json({ error: "Both English and Finnish fields are required." });
  }

  const query = "INSERT INTO word_pairs (english, finnish) VALUES (?, ?)";
  pool.query(query, [english, finnish], (error, results) => {
    if (error) {
      console.error("Error adding word pair:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.json({ message: "Word pair added successfully" });
  });
});

// PUT (update) a word pair by ID
app.put("/api/word_pairs/:id", (req, res) => {
  const { id } = req.params;
  const { english, finnish } = req.body;

  console.log("Received PUT request for id:", id);

  // Check that both "English" and "Finnish" fields are provided
  if (!english || !finnish) {
    return res
      .status(400)
      .json({ error: "Both English and Finnish fields are required." });
  }

  const query = "UPDATE word_pairs SET english = ?, finnish = ? WHERE id = ?";
  pool.query(query, [english, finnish, id], (error, results) => {
    if (error) {
      console.error("Error updating word pair:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // If no rows are affected, the word pair wasn't found
    if (results.length === 0) {
      res.status(404).json({ error: "Word pair not found" });
      return;
    }

    res.json({ success: true });
  });
});

/**
 * Start the server
 * @date 1/17/2024 - 7:14:26 PM
 *
 * @type {*}
 */
const server = app
  .listen(port, () => {
    console.log(`SERVER: Listening on port ${port}.`);
    console.log(process.env); // Print environment variables for debugging
  })
  .on("error", (err) => {
    console.error("SERVER: Error starting server: ", err);
    process.exit(1);
  });

/**
 * Graceful shutdown
 * @date 1/17/2024 - 7:14:26 PM
 *
 **/
const gracefulShutdown = () => {
  console.log("SERVER: Starting grafeful shutdown...");

  if (server) {
    console.log("SERVER: Serves was opened, so we can close it...");
    server.close((err) => {
      if (err) {
        console.error("SERVER: Error closing Express server: ", err);
      } else {
        console.log("SERVER: stopped.");
      }
      console.log("MYSQL: Starting graceful shutdown...");
      pool.end((err) => {
        if (err) {
          console.log("MYSQL: Error closing MySQL pool: ", err);
        } else {
          console.log("MySQL: Pool closed.");
        }
        console.log("MySQL: Shutdown complete.");
        process.exit(1);
      });
    });
  }
};

// Export the MySQL connection pool
module.exports = pool;
