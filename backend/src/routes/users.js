import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT CustomerID, UserName, Email, CreatedAt FROM Customers");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

// Add a new user
router.post("/", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO Users (UserName, Email, password) VALUES (?, ?, ?)",
            [username, email, password]
        );
        res.json({ id: result.insertId, username, email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add user" });
    }
});

export default router;