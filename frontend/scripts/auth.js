document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    function getUsers() {
        const raw = localStorage.getItem("users");
        if (!raw) return [];
        try {
            return JSON.parse(raw);
        } catch {
            return [];
        }
    }

    function saveUsers(users) {
        localStorage.setItem("users", JSON.stringify(users));
    }


    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("signupUsername").value.trim();
            const password = document.getElementById("signupPassword").value.trim();

            if (!username || !password) {
                alert("Please enter a username and password.");
                return;
            }

            const users = getUsers();
            const existing = users.find((u) => u.username === username);

            if (existing) {
                alert("That username is already taken. Please choose another.");
                return;
            }

            users.push({ username, password });
            saveUsers(users);

            localStorage.setItem("loggedInUser", username);

            window.location.href = "home.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("loginUsername").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            const users = getUsers();
            const user = users.find(
                (u) => u.username === username && u.password === password
            );

            if (!user) {
                alert("Invalid username or password. Please sign up first if you don't have an account.");
                return; 
            }

            localStorage.setItem("loggedInUser", user.username);
            window.location.href = "home.html";
        });
    }
});
