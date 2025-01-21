import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.resolve(__dirname, "cms_database.db");
const jsonFilePath = path.resolve(__dirname, "cms-db-data.json");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    initializeDatabase();
  }
});

const initializeDatabase = () => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY,
      wordFirstLang TEXT NOT NULL,
      sentenceFirstLang TEXT,
      wordSecondLang TEXT NOT NULL,
      sentenceSecondLang TEXT
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log('Table "words" is ready.');
        checkAndLoadData();
      }
    }
  );
};

const checkAndLoadData = () => {
  db.get("SELECT COUNT(*) AS count FROM words", (err, row: any) => {
    if (err) {
      console.error("Error checking data:", err.message);
    } else if (row.count === 0) {
      console.log("Table is empty. Loading data...");
      loadData();
    } else {
      console.log("Data already exists. Skipping data load.");
    }
  });
};

const loadData = () => {
  try {
    const rawData = fs.readFileSync(jsonFilePath, "utf-8");
    const data = JSON.parse(rawData);

    const insertQuery = `
      INSERT INTO words (id, wordFirstLang, sentenceFirstLang, wordSecondLang, sentenceSecondLang)
      VALUES (?, ?, ?, ?, ?)
    `;

    data.forEach(
      (item: {
        id: number;
        wordFirstLang: string;
        sentenceFirstLang: string;
        wordSecondLang: string;
        sentenceSecondLang: string;
      }) => {
        db.run(
          insertQuery,
          [
            item.id,
            item.wordFirstLang,
            item.sentenceFirstLang || null,
            item.wordSecondLang,
            item.sentenceSecondLang || null,
          ],
          (err) => {
            if (err) {
              console.error("Failed to insert data:", err.message);
            }
          }
        );
      }
    );

    console.log("Data loaded successfully!");
  } catch (error) {
    console.error("Error loading data:", error.message);
  }
};

export default db;
