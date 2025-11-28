// bookResults

// Declare bookContainerElement in a scope accessible to the function
let bookContainerElement;

function createBookDisplay(book) {
    // Create main book div
    const bookItemDiv = document.createElement('div');
    bookItemDiv.classList.add('book-item');

    // Book cover
    const bookCoverDiv = document.createElement('div');
    bookCoverDiv.classList.add('book-cover');

    const bookCoverImg = document.createElement('img');
    bookCoverImg.src = book.imgSrc || "https://placehold.co/400x300?text=Book+Cover";
    bookCoverImg.alt = book.title;

    // Book info
    const bookInfoDiv = document.createElement('div');
    bookInfoDiv.classList.add('book-info');

    const bookTitleH2 = document.createElement('h2');
    bookTitleH2.classList.add('book-title');
    bookTitleH2.textContent = book.title;

    const bookAuthorP = document.createElement('p');
    bookAuthorP.classList.add('book-author');
    bookAuthorP.textContent = `Author: ${book.author || "Unknown"}`;

    const bookDescriptionP = document.createElement('p');
    bookDescriptionP.classList.add('book-description');
    bookDescriptionP.textContent = book.description || "No description available.";

    const bookRatingP = document.createElement('p');
    bookRatingP.classList.add('book-rating');
    bookRatingP.textContent = `Rating: ${book.rating || "N/A"}`;

    const publicationDateP = document.createElement('p');
    publicationDateP.classList.add('book-publication-date');
    publicationDateP.textContent = `Published: ${book.publicationDate || "N/A"}`;

    const ISBNP = document.createElement('p');
    ISBNP.classList.add('book-isbn');
    ISBNP.textContent = `ISBN: ${book.isbn || "N/A"}`;

    // Append children
    bookCoverDiv.appendChild(bookCoverImg);
    bookInfoDiv.appendChild(bookTitleH2);
    bookInfoDiv.appendChild(bookAuthorP);
    bookInfoDiv.appendChild(bookDescriptionP);
    bookInfoDiv.appendChild(bookRatingP);
    bookInfoDiv.appendChild(publicationDateP);
    bookInfoDiv.appendChild(ISBNP);

    bookItemDiv.appendChild(bookCoverDiv);
    bookItemDiv.appendChild(bookInfoDiv);

    bookContainerElement.appendChild(bookItemDiv);
}

// Book class
class Book {
  constructor(imgSrc, title, author, description, rating, publicationDate, isbn) {
    this.imgSrc = imgSrc;
    this.title = title;
    this.author = author;
    this.description = description;
    this.rating = rating;
    this.publicationDate = publicationDate;
    this.isbn = isbn;
  }
}

// Test book
const testBook = new Book(
    "https://placehold.co/400x300?text=Book+Cover",
    "Sample Book Title",
    "John Doe",
    "This is a sample description of the book.",
    "4.5/5",
    "2023-01-01",
    "123-4567890123"
);

// On page load
window.onload = function() {
    bookContainerElement = document.getElementById('book-results-container');
    createBookDisplay(testBook);
}

console.log("Book display script loaded.");
