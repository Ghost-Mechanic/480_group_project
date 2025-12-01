document.addEventListener("DOMContentLoaded", () => {
    // Search functionality
    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", () => {
        const title = document.getElementById("titleInput").value;
        const author = document.getElementById("authorInput").value;
        const genre = document.getElementById("genreInput").value;
        const year = document.getElementById("dateInput").value;
        const rating = document.getElementById("ratingInput").value;

        // Only include non-empty filters
        const filters = {};
        if (title) filters.title = title;
        if (author) filters.author = author;
        if (genre) filters.genre = genre;
        if (year) filters.datePublished = year;
        if (rating) filters.minRating = rating;

        const params = new URLSearchParams(filters);
        // Redirect to results page
        window.location.href = `results.html?${params.toString()}`;
    });
});
