document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("loginBtn");

    const user = localStorage.getItem("loggedInUser");

    if (user) {
        loginBtn.textContent = `Logout (${user})`;
        loginBtn.style.cursor = "pointer";
    
        loginBtn.addEventListener("click", () => {
            const confirmLogout = confirm("Log out?");
            if (confirmLogout) {
                localStorage.removeItem("loggedInUser");
                window.location.reload();
            }
        });
    } else {
        loginBtn.textContent = "Login / Signup";
        loginBtn.style.cursor = "pointer";
    
        loginBtn.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }

    // search funtionalty same
    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", () => {
        const title = document.getElementById("titleInput").value;
        const author = document.getElementById("authorInput").value;
        const genre = document.getElementById("genreInput").value;
        const year = document.getElementById("dateInput").value;
        const rating = document.getElementById("ratingInput").value;

        const params = new URLSearchParams({ 
            title, 
            author, 
            genre, 
            datePublished: year, 
            minRating: rating 
        });

        window.location.href = `results.html?${params.toString()}`;
    });

});
