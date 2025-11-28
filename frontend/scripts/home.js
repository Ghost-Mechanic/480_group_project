// Handle login button
document.getElementById("loginBtn").addEventListener("click", () => {
    window.location.href = "login.html"; // redirect to login page--> placeholder for now
});

// Handle search button
document.getElementById("searchBtn").addEventListener("click", () => {
    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const genre = document.getElementById("genreInput").value;
    const year = document.getElementById("dateInput").value;
    const rating = document.getElementById("ratingInput").value;

    const params = new URLSearchParams({ title, author, genre, datePublished: year, minRating: rating });
    window.location.href = `results.html?${params.toString()}`; // Redirect to results page
});
