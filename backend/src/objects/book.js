export default class Book {
    constructor(
        isbn,
        title,
        synopsis,
        overallRating,
        datePublished,
        coverImage,
        cost,
        authors, // array of authors
        genres, // array of genres
    ) {
        this.isbn = isbn;
        this.title = title;
        this.synopsis = synopsis;
        this.overallRating = overallRating;
        this.datePublished = datePublished;
        this.coverImage = coverImage;
        this.cost = cost;
        this.authors = authors;
        this.genres = genres;
    }
}