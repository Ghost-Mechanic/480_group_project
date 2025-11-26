import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT 
    b.ISBN,
    b.Title,
    b.Synopsis,
    b.OverallRating,
    b.DatePublished,
    b.CoverImage,
    b.Cost,
    GROUP_CONCAT(a.AuthorName SEPARATOR ', ') AS Authors
FROM Books b
LEFT JOIN BookAuthors ba ON b.ISBN = ba.ISBN
LEFT JOIN Authors a ON ba.AuthorID = a.AuthorID
GROUP BY b.ISBN;`);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

// Add a new book
router.post("/", async (req, res) => {
    const { title, description } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO Books (title, description) VALUES (?, ?)",
            [title, description]
        );
        res.json({ id: result.insertId, title, description });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add book" });
    }
});

export default router;