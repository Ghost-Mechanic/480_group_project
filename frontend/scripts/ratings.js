//Test w this link: http://localhost:63342/frontend/ratings.html?isbn=9781848703629
//                  http://localhost:63342/frontend/ratings.html?isbn=9781583962428
const API = "http://localhost:3001";

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const isbn = params.get("isbn");

    loadBookDetails(isbn);
    loadRatings(isbn);
});

async function loadBookDetails(isbn) {
    try {
        const res = await fetch(`${API}/api/books/${isbn}`);

        if (!res.ok) {
            console.error("Failed to fetch book:", await res.text());
            return;
        }

        const book = await res.json();
        // console.log(book);
        renderBookInfo( book)
    } catch (err) {
        console.error(err);
    }
}

async function loadRatings(isbn) {
    const res = await fetch(`${API}/api/ratings/book?isbn=${isbn}`);
    const ratings = await res.json();

    // console.log(ratings);
    renderRatings(ratings);
}

function renderBookInfo(bookData) {
    const bookContainer = document.getElementById('book-details');
    if (!bookContainer) return;

    const html = `
        <div class="book-header">
            <img src="${bookData.CoverImage}" alt="${bookData.Title} cover" class="book-cover">
            <div class="book-meta">
                <h1>${bookData.Title}</h1>
                <h3>by ${bookData.Authors} (${bookData.DatePublished})</h3>
                <p>${bookData.Synopsis}</p>
                <p>Avg rating: ${bookData.AvgRating ? `${bookData.AvgRating} ⭐` : "No ratings yet"
}</p>
            </div>
        </div>
    `;
    
    bookContainer.innerHTML = html;
}

function renderRatings(ratingsData) {
    const ratingsContainer = document.getElementById('ratings-list');
    if (!ratingsContainer) return;

    const html = ratingsData.map(review => `
        <div class="rating-card">
            <div class="rating-header">
                <span class="rating-user">${review.UserName}</span>
                <span class="rating-date">${review.CreatedAt}</span>
            </div>
            <div class="rating-stars">${'★'.repeat(review.RatingValue)}${'☆'.repeat(5 - review.stars)}</div>
            <p class="rating-comment">${review.Description}</p>
        </div>
    `).join('');

    ratingsContainer.innerHTML = html;
}


//Called when user submits form
document.addEventListener("DOMContentLoaded", () => {
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

        const user = JSON.parse(localStorage.getItem("loggedInUser"));

        const body = {
            customerId: user ? user.id : null,
            isbn: isbn,
            userName: user ? user.username : null,
            ratingValue: stars,
            description: reviewText,
            createdAt: new Date().toISOString().split("T")[0]
        };

        if (body.userName == null || body.customerId == null){
            alert("You must be logged in to submit a rating.");
            return;
        }

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
            window.location.reload();

        } catch (err) {
            console.error(err);
            alert("Error submitting rating. Please try again.");
        }
    });
});