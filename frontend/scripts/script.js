document.addEventListener("DOMContentLoaded", () => {
    const bookGrid = document.getElementById("book-grid");
    const loadingText = document.getElementById("loading-text");
    const yearSpan = document.getElementById("year");

    // Set dynamic year in footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    async function fetchData() {
        try {
            const booksRes = await fetch("http://localhost:3001/api/books");
            const booksData = await booksRes.json();
            console.log(booksData);

            renderBooks(booksData);
        } catch (err) {
            console.error(err);
            if (loadingText) loadingText.textContent = "Error loading books.";
        }
    }

    function renderBooks(books) {
        // Hide loading, show grid
        if (loadingText) loadingText.style.display = "none";
        if (bookGrid) {
            bookGrid.style.display = "grid";
            bookGrid.innerHTML = ""; // Clear existing content if any

            books.forEach((book) => {
                // Create Card Container
                const card = document.createElement("div");
                Object.assign(card.style, {
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                });

                // Create Image
                const img = document.createElement("img");
                img.src = book.CoverImage || "https://placehold.co/400x300?text=Book+Cover";
                img.alt = book.Title;
                Object.assign(img.style, {
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                });

                // Create Content Container
                const contentDiv = document.createElement("div");
                Object.assign(contentDiv.style, {
                    padding: "1rem",
                    flex: "1",
                });

                // Title
                const title = document.createElement("h3");
                title.textContent = book.Title;
                Object.assign(title.style, {
                    margin: "0 0 0.5rem 0",
                    fontSize: "1.2rem",
                });

                // Author
                const authorP = document.createElement("p");
                authorP.innerHTML = `<strong>Author:</strong> ${book.Authors || "Unknown"}`;
                Object.assign(authorP.style, {
                    margin: "0 0 0.5rem 0",
                    color: "#555",
                });

                // Published Date
                const publishedP = document.createElement("p");
                publishedP.innerHTML = `<strong>Published:</strong> ${book.DatePublished}`;
                Object.assign(publishedP.style, {
                    margin: "0 0 0.5rem 0",
                    color: "#777",
                    fontSize: "0.9rem",
                });

                // Assemble Card
                contentDiv.appendChild(title);
                contentDiv.appendChild(authorP);
                contentDiv.appendChild(publishedP);

                card.appendChild(img);
                card.appendChild(contentDiv);

                // Add to Grid
                bookGrid.appendChild(card);
            });
        }
    }

    // Initialize
    fetchData();
});