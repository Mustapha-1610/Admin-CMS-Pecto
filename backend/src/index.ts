import db from "./DB/db-connect";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

// Fetch all words from the database
app.get("/api/words", (req, res) => {
  db.all("SELECT * FROM words", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Update a word entry by ID
app.put("/api/words/:id", (req, res) => {
  const { id } = req.params;
  const {
    wordFirstLang,
    wordSecondLang,
    sentenceFirstLang,
    sentenceSecondLang,
  } = req.body;

  // Check if the entry exists
  db.get("SELECT * FROM words WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Database error." });
    }
    if (!row) {
      return res.status(404).json({ error: "Entry does not exist." });
    }

    // Build the update query dynamically
    let query = "UPDATE words SET ";
    const params = [];

    if (wordFirstLang) {
      query += "wordFirstLang = ?, ";
      params.push(wordFirstLang);
    }
    if (sentenceFirstLang) {
      query += "sentenceFirstLang = ?, ";
      params.push(sentenceFirstLang);
    }
    if (wordSecondLang) {
      query += "wordSecondLang = ?, ";
      params.push(wordSecondLang);
    }
    if (sentenceSecondLang) {
      query += "sentenceSecondLang = ?, ";
      params.push(sentenceSecondLang);
    }

    query = query.slice(0, -2) + " WHERE id = ?";
    params.push(id);

    db.run(query, params, function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to update the word." });
      }
      res.json({ message: "Word updated successfully!" });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
