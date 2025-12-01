//Test w this link: http://localhost:63342/frontend/ratings.html?isbn=9781848703629

const params = new URLSearchParams(window.location.search);
const isbn = params.get("isbn");

console.log("Viewing ratings for ISBN:", isbn);

window.addEventListener("DOMContentLoaded", async () => {
    try {
        // Get query params from URL
        const urlParams = new URLSearchParams(window.location.search);

        // Fetch books from backend
        const res = await fetch(`http://localhost:3001/api/books/filter?${urlParams.toString()}`);
        const data = await res.json();
        booklist = data
        // Print the books to console
        console.log("Fetched books:", data);

    } catch (err) {
        console.error("Error fetching books:", err);
    }

    // renderBookInfo()
});

function renderBookInfo() {
    const bookContainer = document.getElementById('book-details');
    if (!bookContainer) return;

    const html = `
        <div class="book-header">
            <img src="${bookData.CoverImage}" alt="${bookData.Title} cover" class="book-cover">
            <div class="book-meta">
                <h1>${bookData.Title}</h1>
                <h3>by ${bookData.Author} (${bookData.DatePublished})</h3>
                <p>${bookData.Synposis}</p>
                <p>Avg rating: ${bookData.AvgRating}</p>
            </div>
        </div>
    `;
    
    bookContainer.innerHTML = html;
}

function renderRatings() {
    const ratingsContainer = document.getElementById('ratings-list');
    if (!ratingsContainer) return;

    const html = ratingsData.map(review => `
        <div class="rating-card">
            <div class="rating-header">
                <span class="rating-user">${review.UserName}</span>
                <span class="rating-date">${review.Date}</span>
            </div>
            <div class="rating-stars">${'★'.repeat(review.RatingValue)}${'☆'.repeat(5 - review.stars)}</div>
            <p class="rating-comment">${review.Description}</p>
        </div>
    `).join('');

    ratingsContainer.innerHTML = html;
}


//Called when user submits form
const API = "http://localhost:3001";

document.addEventListener("DOMContentLoaded", () => {
    // Read ?isbn=... from URL
    const params = new URLSearchParams(window.location.search);
    const isbn = params.get("isbn");

    if (!isbn) {
        alert("ERROR: No ISBN provided in URL.");
        return;
    }

    const ratingForm = document.getElementById("ratingForm");

    ratingForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const stars = document.getElementById("ratingStars").value;
        const reviewText = document.getElementById("ratingText").value;

        // OPTIONAL — get the logged in user
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        const userId = user ? user.CustomerID : null;

        const body = {
            isbn,
            stars,
            review: reviewText,
            userId         // send null if no login
        };

        try {
            const res = await fetch(`${API}/api/ratings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const error = await res.json();
                alert("Failed to submit rating: " + error.error);
                return;
            }

            alert("Your rating has been submitted!");
            ratingForm.reset();

        } catch (err) {
            console.error(err);
            alert("Error submitting rating. Please try again.");
        }
    });
});