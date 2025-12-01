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
            b.DatePublished,
            b.CoverImage,
            b.AvgRating,
            GROUP_CONCAT(DISTINCT CONCAT(a.FirstName, ' ', a.LastName) SEPARATOR ', ') AS Authors,
            GROUP_CONCAT(DISTINCT g.GenreName SEPARATOR ', ') AS Genres
            FROM Book b
            LEFT JOIN Author a ON b.ISBN = a.ISBN
            LEFT JOIN Genres g ON b.ISBN = g.ISBN
            GROUP BY b.ISBN;`
        );
        
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
            conditions.push("(a.FirstName LIKE ? OR a.LastName LIKE ? OR CONCAT(a.FirstName, ' ', a.LastName) LIKE ?)");
            params.push(`%${author}%`);
            params.push(`%${author}%`);
            params.push(`%${author}%`);
        }

        if (genre) {
            conditions.push("g.GenreName LIKE ?");
            params.push(`%${genre}%`);
        }

        if (minRating) {
            conditions.push("b.AvgRating >= ?");
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
            b.DatePublished,
            b.CoverImage,
            b.AvgRating,
            GROUP_CONCAT(DISTINCT CONCAT(a.FirstName, ' ', a.LastName) SEPARATOR ', ') AS Authors,
            GROUP_CONCAT(DISTINCT g.GenreName SEPARATOR ', ') AS Genres
            FROM Book b
            LEFT JOIN Author a ON b.ISBN = a.ISBN
            LEFT JOIN Genres g ON b.ISBN = g.ISBN
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
                    rows[i].AvgRating,
                    rows[i].DatePublished,
                    rows[i].CoverImage,
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

//Gets a book based on ISBN
// Get a specific book by ISBN
router.get("/:isbn", async (req, res) => {
    const { isbn } = req.params;

    try {
        const [rows] = await db.query(
            `
            SELECT 
                b.ISBN,
                b.Title,
                b.Synopsis,
                b.DatePublished,
                b.CoverImage,
                b.AvgRating,
                GROUP_CONCAT(DISTINCT CONCAT(a.FirstName, ' ', a.LastName) SEPARATOR ', ') AS Authors,
                GROUP_CONCAT(DISTINCT g.GenreName SEPARATOR ', ') AS Genres
            FROM Book b
            LEFT JOIN Author a ON b.ISBN = a.ISBN
            LEFT JOIN Genres g ON b.ISBN = g.ISBN
            WHERE b.ISBN = ?
            GROUP BY b.ISBN;
            `,
            [isbn]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.json(rows[0]); // send single book object
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch book" });
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