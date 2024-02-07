// Backend: wordPairs.js

/**
 * Express - Web framework for Node.js
 * @date 1/17/2024 - 7:19:47 PM
 *
 * @type {*}
 */
const express = require("express");
/**
 * Express router - Creates modular, mountable route handlers.
 * @date 1/17/2024 - 7:19:47 PM
 *
 * @type {*}
 */
const router = express.Router();
/**
 * Database connection pool - Manages multiple connections to a database.
 * @date 1/17/2024 - 7:19:47 PM
 *
 * @type {*}
 */
const pool = require("./index.js");

// POST endpoint for adding new word pairs
router.post("/api/word_pairs", (req, res) => {
  const { english, finnish } = req.body;

  // Check that both "English" and "Finnish" fields are given
  if (!english || !finnish) {
    return res
      .status(400)
      .json({ error: "Both English and Finnish fields are required." });
  }

  const query = "INSERT INTO word_pairs (english, finnish) VALUES (?, ?)";
  pool.query(query, [english, finnish], (error, results) => {
    if (error) {
      console.error("Error adding word pair to the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json({ success: true });
  });
});

// GET endpoint for retrieving all word pairs
router.get("/", (req, res) => {
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

// DELETE endpoint for removing a word pair by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Delete word from database by Id
  const query = "DELETE FROM word_pairs WHERE id = ?";
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error deleting word pair from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json({ success: true });
  });
});

// PUT endpoint for updating a word pair by ID
router.put("/api/word_pairs/:id", (req, res) => {
  const { id } = req.params;
  const { english, finnish } = req.body;

  // Update word from database by Id
  pool.query(
    "UPDATE word_pairs SET english = ?, finnish = ? WHERE id = ?",
    [english, finnish, id],
    (error, results) => {
      if (error) {
        console.error("Error updating word pair in the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ success: true });
    }
  );
});

module.exports = router;
