import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Get all books with their authors
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT Books.id AS book_id, Books.title, Books.description, Authors.id AS author_id, Authors.name AS author_name
      FROM BookAuthors
      JOIN Books ON Books.id = BookAuthors.book_id
      JOIN Authors ON Authors.id = BookAuthors.author_id
    `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch books with authors" });
    }
});

// Add author to book
router.post("/", async (req, res) => {
    const { book_id, author_id } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO BookAuthors (book_id, author_id) VALUES (?, ?)",
            [book_id, author_id]
        );
        res.json({ success: true, book_id, author_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add author to book" });
    }
});

export default router;