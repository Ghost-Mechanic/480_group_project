document.addEventListener('DOMContentLoaded', () => {
    const container = document.body;

    // Create Header
    const header = document.createElement('header');
    header.innerHTML = `
        <a href="index.html"><h1>BookOverflow</h1></a>
        <button id="loginBtn">Login / Signup</button>
    `;

    // Insert Header (as first child)
    if (container.firstChild) {
        container.insertBefore(header, container.firstChild);
    } else {
        container.appendChild(header);
    }

    // Query the button from the newly inserted header (not document)
    const loginBtn = header.querySelector('#loginBtn');

    if (!loginBtn) {
        console.error('loginBtn not found in header');
        return;
    }

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user) {
        loginBtn.textContent = `Logout (${user.username})`;
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
});