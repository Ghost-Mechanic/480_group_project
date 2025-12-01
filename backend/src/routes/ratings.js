import express from "express";
import { db } from "../db.js";

const router = express.Router();

// get all ratings
router.get("/", async(req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT ISBN, 
            UserName, 
            RatingValue, 
            Description, 
            CreatedAt 
            FROM Rating`
        );

        res.json(rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch all ratings" });
    }
});

//Gets a specific rating based on ISBN
// get ratings for a specific book by ISBN
router.get("/:isbn", async (req, res) => {
    const { isbn } = req.query;

    if (!isbn) return res.status(400).json({ error: "ISBN is required" });

    try {
        const [rows] = await db.query(
            `SELECT ISBN, 
                    UserName, 
                    RatingValue, 
                    Description, 
                    CreatedAt 
             FROM Rating
             WHERE ISBN = ?
             ORDER BY CreatedAt DESC`,
            [isbn]
        );

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch ratings for this book" });
    }
});

// add a new rating
router.post("/", async (req, res) => {
    const { customerId, isbn, userName, ratingValue, description, createdAt } = req.body;

    if (ratingValue < 1 || ratingValue > 5) {
        return res.status(400).json({ error: "Invalid rating" });
    }

    const date = createdAt || new Date().toISOString().split("T")[0]; // default to today

    try {
        const [rows] = await db.query(
            `INSERT INTO Rating 
            (CustomerID, ISBN, UserName, RatingValue, Description, CreatedAt) 
            VALUES(?, ?, ?, ?, ?, ?)`,
            [customerId, isbn, userName, ratingValue, description, date]
        );

        // 2. Recalculate average rating
        const [avgResult] = await db.query(
            `SELECT AVG(RatingValue) AS avgRating FROM Rating WHERE ISBN = ?`,
            [isbn]
        );

        const avgRating = avgResult[0].avgRating;

        // 3. Update the Book table
        await db.query(
            `UPDATE Book SET AvgRating = ? WHERE ISBN = ?`,
            [avgRating, isbn]
        );

        res.json({ id: rows.insertId, customerId, isbn, userName, ratingValue, description, createdAt: date, avgRating });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add rating" });
    }
});

export default router;