import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customers.js";
import bookRoutes from "./routes/books.js";
import authorRoutes from "./routes/authors.js";
import genreRoutes from "./routes/genres.js";
import bookAuthorsRoutes from "./routes/bookAuthors.js";
import bookGenresRoutes from "./routes/bookGenres.js";
import ratingRoutes from "./routes/ratings.js";
import path from 'path';

import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

// Needed because you're using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../frontend")));

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/book-authors", bookAuthorsRoutes);
app.use("/api/book-genres", bookGenresRoutes);
app.use("/api/ratings", ratingRoutes);

// app.get("/", (req, res) => res.send("Backend is running!"));

// Make home.html the default page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/home.html"));
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));