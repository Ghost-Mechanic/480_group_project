// bookResults

// Declare bookContainerElement in a scope accessible to the function
let bookContainerElement;
let batchCount = 10;
let batchNum = 0;
let booklist = [];

let resultsHeading;

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
    bookContainerElement = document.getElementById('book-results-container');
    resultsHeading = document.getElementById('results-h1')
    bookContainerElement.innerHTML = ""; // clear any previous content

    if (booklist.length == 0) {
      resultsHeading.textContent = 'No Results'
    }
    else {
      resultsHeading.textContent = booklist.length + ' Result(s) (Showing Top 10)'
      createBookDisplay();
    }

  } catch (err) {
    console.error("Error fetching books:", err);
  }
});

function createBook(book) {
  console.log(book.toString())
  // Create main book div
  const bookItemDiv = document.createElement('div');
  bookItemDiv.classList.add('book-item');

  // Book cover
  const bookCoverDiv = document.createElement('div');
  bookCoverDiv.classList.add('book-cover');

  const bookCoverImg = document.createElement('img');
  bookCoverImg.src = book.coverImage || "https://placehold.co/400x300?text=Book+Cover";
  bookCoverImg.alt = book.title;

  // Book info
  const bookInfoDiv = document.createElement('div');
  bookInfoDiv.classList.add('book-info');

  const bookTitleH2 = document.createElement('h2');
  bookTitleH2.classList.add('book-title');
  bookTitleH2.textContent = book.title;

  const bookAuthorP = document.createElement('p');
  bookAuthorP.classList.add('book-author');
  bookAuthorP.textContent = `Author(s): ${book.authors || "Unknown"}`;

  const bookGenresP = document.createElement('p')
  bookGenresP.classList.add('book-genre')
  bookGenresP.textContent = `Genre(s): ${book.genres || "Unknown"}`;

  const bookDescriptionP = document.createElement('p');
  bookDescriptionP.classList.add('book-description');
  bookDescriptionP.textContent = book.synopsis || "No description available.";

  const bookRatingP = document.createElement('p');
  bookRatingP.classList.add('book-rating');
  bookRatingP.textContent = `Rating: ${book.avgRating || "N/A"}`;

  const publicationDateP = document.createElement('p');
  publicationDateP.classList.add('book-publication-date');
  publicationDateP.textContent = `Published: ${book.datePublished || "N/A"}`;

  const ISBNP = document.createElement('p');
  ISBNP.classList.add('book-isbn');
  ISBNP.textContent = `ISBN: ${book.isbn || "N/A"}`;

const ratingsLink = document.createElement('a');
ratingsLink.textContent = "See Ratings";
ratingsLink.href = `ratings.html?isbn=${book.isbn}`;

  // Append children
  bookCoverDiv.appendChild(bookCoverImg);
  bookInfoDiv.appendChild(bookTitleH2);
  bookInfoDiv.appendChild(bookAuthorP);
  bookInfoDiv.appendChild(bookGenresP);
  bookInfoDiv.appendChild(bookDescriptionP);
  bookInfoDiv.appendChild(bookRatingP);
  bookInfoDiv.appendChild(publicationDateP);
  bookInfoDiv.appendChild(ISBNP);
  bookInfoDiv.appendChild(ratingsLink);

  bookItemDiv.appendChild(bookCoverDiv);
  bookItemDiv.appendChild(bookInfoDiv);

  bookContainerElement.appendChild(bookItemDiv);
}

function createBookDisplay() {
  if (booklist.length > batchCount) {
    for (let i = batchNum * batchCount; i < (batchNum * batchCount) + batchCount; i++) {
      createBook(booklist[i])
    }
    batchNum++;
  }
  else {
    booklist.forEach(book => {
      createBook(book);
    });
  }

}

console.log("Book display script loaded.");


