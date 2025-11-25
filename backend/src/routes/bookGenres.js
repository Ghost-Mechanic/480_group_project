import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Get all books with their genres
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT Books.id AS book_id, Books.title, Books.description, Genres.id AS genre_id, Genres.name AS genre_name
      FROM BookGenres
      JOIN Books ON Books.id = BookGenres.book_id
      JOIN Genres ON Genres.id = BookGenres.genre_id
    `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch books with genres" });
    }
});

// Add genre to book
router.post("/", async (req, res) => {
    const { book_id, genre_id } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO BookGenres (book_id, genre_id) VALUES (?, ?)",
            [book_id, genre_id]
        );
        res.json({ success: true, book_id, genre_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add genre to book" });
    }
});

export default router;