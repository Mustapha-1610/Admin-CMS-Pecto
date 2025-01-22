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
app.get("/api/words", (req, res) => {
  db.all("SELECT * FROM words", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.put("/api/words/:id", (req, res) => {
  const { id } = req.params;
  const {
    wordFirstLang,
    wordSecondLang,
    sentenceFirstLang,
    sentenceSecondLang,
  } = req.body;

  console.log(
    wordFirstLang,
    wordSecondLang,
    sentenceFirstLang,
    sentenceSecondLang
  );
  // Base query and parameters
  let query = "UPDATE words SET ";
  const params: any[] = [];

  // Add fields to update only if they are not empty or null
  if (wordFirstLang && wordFirstLang !== "") {
    query += "wordFirstLang = ?, ";
    params.push(wordFirstLang);
  }
  if (sentenceFirstLang && sentenceFirstLang !== "") {
    query += "sentenceFirstLang = ?, ";
    params.push(sentenceFirstLang);
  }
  if (wordSecondLang && wordSecondLang !== "") {
    query += "wordSecondLang = ?, ";
    params.push(wordSecondLang);
  }
  if (sentenceSecondLang && sentenceSecondLang !== "") {
    query += "sentenceSecondLang = ?, ";
    params.push(sentenceSecondLang);
  }

  // Remove trailing comma and add WHERE clause
  query = query.slice(0, -2) + " WHERE id = ?";
  params.push(id);

  // Execute the query
  db.run(query, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({
        message: "Word updated successfully!",
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
