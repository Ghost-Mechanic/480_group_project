import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import authorRoutes from "./routes/authors.js";
import genreRoutes from "./routes/genres.js";
import bookAuthorsRoutes from "./routes/bookAuthors.js";
import bookGenresRoutes from "./routes/bookGenres.js";
import path from 'path';

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/book-authors", bookAuthorsRoutes);
app.use("/api/book-genres", bookGenresRoutes);

app.get("/", (req, res) => res.send("Backend is running!"));

// Serve React
app.use(express.static(path.join(process.cwd(), 'client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));