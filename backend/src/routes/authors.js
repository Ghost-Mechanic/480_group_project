import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Authors");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

router.post("/", async (req, res) => {
    const { name } = req.body;
    try {
        const [result] = await db.query("INSERT INTO Authors (name) VALUES (?)", [name]);
        res.json({ id: result.insertId, name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add author" });
    }
});

export default router;