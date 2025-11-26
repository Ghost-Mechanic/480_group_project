import { useEffect, useState } from "react";

function App() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const booksRes = await fetch("http://localhost:3001/api/books");
                const booksData = await booksRes.json();
                console.log(booksData);

                setBooks(booksData);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
            {/* Header */}
            <header style={{ backgroundColor: "#2c3e50", color: "white", padding: "1rem 2rem", textAlign: "center" }}>
                <h1 style={{ margin: 0 }}>Book Overflow</h1>
            </header>

            {/* Main Content */}
            <main style={{ flex: 1, padding: "2rem", backgroundColor: "#f4f4f9" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {books.map((book) => (
                        <div
                            key={book.ISBN}
                            style={{
                                backgroundColor: "white",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                overflow: "hidden",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <img
                                src={book.CoverImage || "https://placehold.co/400x300?text=Book+Cover"}
                                alt={book.Title}
                                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                            />
                            <div style={{ padding: "1rem", flex: 1 }}>
                                <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem" }}>{book.Title}</h3>
                                <p style={{ margin: "0 0 0.5rem 0", color: "#555" }}>
                                    <strong>Author:</strong> {book.Authors || "Unknown"}
                                </p>
                                <p style={{ margin: "0 0 0.5rem 0", color: "#777", fontSize: "0.9rem" }}>
                                    <strong>Published:</strong> {Date(book.DatePublished).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                        }) || "Unknown Date"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: "#2c3e50", color: "white", textAlign: "center", padding: "1rem" }}>
                <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Book Overflow. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;