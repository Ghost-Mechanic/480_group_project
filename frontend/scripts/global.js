document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const container = app || document.body;

    // Create Header
    const header = document.createElement('header');
    header.style.cssText = 'background-color: #2c3e50; color: white; padding: 1rem 2rem; text-align: center;';
    header.innerHTML = `
        <h1 style="margin: 0;">
            <a href="index.html" style="text-decoration: none; color: white;">Book Overflow</a>
        </h1>
        <nav style="margin-top: 10px;">
            <a href="index.html" style="color: #bdc3c7; margin: 0 10px; text-decoration: none;">Home</a>
            <a href="ratings.html" style="color: #bdc3c7; margin: 0 10px; text-decoration: none;">Ratings</a>
        </nav>
    `;

    // Create Footer
    const footer = document.createElement('footer');
    footer.style.cssText = 'background-color: #2c3e50; color: white; text-align: center; padding: 1rem; margin-top: auto;';
    footer.innerHTML = `
        <p style="margin: 0;">&copy; <span id="year">${new Date().getFullYear()}</span> Book Overflow. All rights reserved.</p>
    `;

    // Insert Header (as first child)
    if (container.firstChild) {
        container.insertBefore(header, container.firstChild);
    } else {
        container.appendChild(header);
    }

    // Insert Footer (as last child)
    container.appendChild(footer);
});