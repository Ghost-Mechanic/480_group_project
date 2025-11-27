document.addEventListener('DOMContentLoaded', () => {
    renderBookInfo();
    renderRatings();
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