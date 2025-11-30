import express from "express";
import { db } from "../db.js";

const router = express.Router();

// get all customers
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT CustomerID, UserName, Email, DateCreated FROM Customer");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

// add a new customer
router.post("/", async (req, res) => {
    const { firstName, lastName, username, password, email, dateCreated } = req.body;

    const date = dateCreated || new Date().toISOString().split("T")[0]; // default to today

    try {
        const [result] = await db.query(
            `INSERT INTO Customer (FirstName, LastName, UserName, PasswordHash, Email, DateCreated)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, username, password, email, date]
        );

        res.json({ id: result.insertId, firstName, lastName, username, email, date });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add customer" });
    }
});

// POST /customers/login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const [rows] = await db.query(
            "SELECT CustomerID, UserName, PasswordHash, Email FROM Customer WHERE UserName = ?",
            [username]
        );

        if (rows.length === 0) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const user = rows[0];

        // Compare password
        if (user.PasswordHash !== password) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Success: return basic info
        res.json({
            id: user.CustomerID,
            username: user.UserName,
            email: user.Email
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed" });
    }
});

export default router;