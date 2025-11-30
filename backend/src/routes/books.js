import express from "express";
import { db } from "../db.js";
import Book from "../objects/book.js";

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
    GROUP_CONCAT(DISTINCT a.AuthorName SEPARATOR ', ') AS Authors,
    GROUP_CONCAT(DISTINCT c.GenreName SEPARATOR ', ') AS Genres
FROM Books b
LEFT JOIN BookAuthors ba ON b.ISBN = ba.ISBN
LEFT JOIN Authors a ON ba.AuthorID = a.AuthorID
LEFT JOIN BookGenres bg ON b.ISBN = bg.ISBN
LEFT JOIN Genres c ON bg.GenreID = c.GenreID
GROUP BY b.ISBN;`);
        
        // console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

router.get("/filter", async (req, res) => {
    const {
        title,
        datePublished,
        author,
        genre,
        minRating
    } = req.query;

    try {
        let conditions = []
        let params = []

        if (title) {
            conditions.push("b.Title LIKE ?");
            params.push(`%${title}%`);
        }

        if (datePublished) {
            conditions.push("YEAR(b.DatePublished) = ?");
            params.push(datePublished);
        }

        if (author) {
            // For author, filter on Authors table
            conditions.push("a.AuthorName LIKE ?");
            params.push(`%${author}%`);
        }

        if (genre) {
            conditions.push("c.GenreName LIKE ?");
            params.push(`%${genre}%`);
        }

        if (minRating) {
            conditions.push("b.OverallRating >= ?");
            params.push(minRating);
        }

        // If no filters, default to TRUE (return everything)
        let whereClause = conditions.length > 0
            ? "WHERE " + conditions.join(" AND ")
            : "";

        const [rows] = await db.query(
            `
            SELECT 
                b.ISBN,
                b.Title,
                b.Synopsis,
                b.OverallRating,
                b.DatePublished,
                b.CoverImage,
                b.Cost,
                GROUP_CONCAT(DISTINCT a.AuthorName SEPARATOR ', ') AS Authors,
                GROUP_CONCAT(DISTINCT c.GenreName SEPARATOR ', ') AS Genres
            FROM Books b
            LEFT JOIN BookAuthors ba ON b.ISBN = ba.ISBN
            LEFT JOIN Authors a ON ba.AuthorID = a.AuthorID
            LEFT JOIN BookGenres bg ON b.ISBN = bg.ISBN
            LEFT JOIN Genres c ON bg.GenreID = c.GenreID
            ${whereClause}
            GROUP BY b.ISBN
            ORDER BY b.DatePublished ASC;
            `,
            params
        );
        
        let books = []

        for (let i = 0; i < rows.length; ++i) {
            books.push(
                new Book(
                    rows[i].ISBN,
                    rows[i].Title,
                    rows[i].Synopsis,
                    rows[i].OverallRating,
                    rows[i].DatePublished,
                    rows[i].CoverImage,
                    rows[i].Cost,
                    rows[i].Authors,
                    rows[i].Genres,
                )
            );
        }
        console.log(books);
        res.json(books);
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