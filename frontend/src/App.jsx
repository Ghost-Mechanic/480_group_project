import { useEffect, useState } from "react";

function App() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const booksRes = await fetch("http://localhost:3001/api/books");
                const booksData = await booksRes.json();

                const authorsRes = await fetch("http://localhost:3001/api/book-authors");
                const authorsData = await authorsRes.json();

                const genresRes = await fetch("http://localhost:3001/api/book-genres");
                const genresData = await genresRes.json();

                setBooks(booksData);
                setAuthors(authorsData);
                setGenres(genresData);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

    // Helper to get authors for a book
    const getAuthorsForBook = (bookId) =>
        authors.filter((a) => a.book_id === bookId).map((a) => a.author_name).join(", ");

    // Helper to get genres for a book
    const getGenresForBook = (bookId) =>
        genres.filter((g) => g.book_id === bookId).map((g) => g.genre_name).join(", ");

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            <h1>BookOverflow</h1>
            {books.map((book) => (
                <div
                    key={book.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "1rem",
                        marginBottom: "1rem",
                        borderRadius: "8px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                >
                    <h2>{book.title}</h2>
                    <p>{book.description}</p>
                    <p>
                        <strong>Authors:</strong> {getAuthorsForBook(book.id) || "N/A"}
                    </p>
                    <p>
                        <strong>Genres:</strong> {getGenresForBook(book.id) || "N/A"}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default App;