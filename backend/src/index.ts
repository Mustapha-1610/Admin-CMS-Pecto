import db from "./DB/db-connect";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.use(express.json());

app.get("/api/words", (req, res) => {
  const { search } = req.query;
  const query = search
    ? `SELECT * FROM words WHERE word LIKE ? OR translation LIKE ?`
    : `SELECT * FROM words`;
  const params = search ? [`%${search}%`, `%${search}%`] : [];
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.put("/api/words/:id", (req, res) => {
  const { id } = req.params;
  const { word, translation, example_sentence } = req.body;

  const query = `
        UPDATE words
        SET word = ?, translation = ?, example_sentence = ?
        WHERE id = ?
    `;

  db.run(query, [word, translation, example_sentence, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({
        message: "Word updated successfully!",
        changes: this.changes,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
