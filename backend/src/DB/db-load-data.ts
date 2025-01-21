import fs from "fs";
import path from "path";
import db from "./db-connect";

const jsonFilePath = path.resolve(__dirname, "DB", "cms-db-data.json");

const loadData = async () => {
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

loadData();
