export default class Book {
    constructor(
        isbn,
        title,
        synopsis,
        avgRating,
        datePublished,
        coverImage,
        authors, // array of authors
        genres, // array of genres
    ) {
        this.isbn = isbn;
        this.title = title;
        this.synopsis = synopsis;
        this.avgRating = avgRating;
        this.datePublished = datePublished;
        this.coverImage = coverImage;
        this.authors = authors;
        this.genres = genres;
    }
}