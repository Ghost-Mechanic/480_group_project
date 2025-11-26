 USE cs480_group_project;

-- Make a temporary table that enforces 1 row per ISBN
CREATE TABLE Genres_single (
    ISBN      VARCHAR(20) PRIMARY KEY,
    GenreName VARCHAR(100),
    FOREIGN KEY (ISBN) REFERENCES Book(ISBN)
);

-- Copy data: pick ONE genre per ISBN (alphabetically first)
INSERT INTO Genres_single (ISBN, GenreName)
SELECT
    ISBN,
    MIN(GenreName) AS GenreName
FROM Genres
GROUP BY ISBN;

-- Check counts (optional)
SELECT COUNT(*) AS num_books FROM Book;
SELECT COUNT(*) AS num_genres_single FROM Genres_single;

SELECT COUNT(*) AS num_books FROM Book;
SELECT COUNT(*) AS num_genres_single FROM Genres_single;

CREATE TABLE Genres_single (
    ISBN VARCHAR(20) PRIMARY KEY,
    GenreName VARCHAR(100)
);

INSERT INTO Genres_single (ISBN, GenreName)
SELECT ISBN, MIN(GenreName)
FROM Genres
GROUP BY ISBN;

DROP TABLE Genres;
RENAME TABLE Genres_single TO Genres;
