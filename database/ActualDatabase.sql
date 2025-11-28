USE bookoverflow;

-- Customers
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(200),
    LastName VARCHAR(200),
    UserName VARCHAR(50),
    Email VARCHAR(100),
    Password VARCHAR(255),
    DateCreated DATE
);

-- Books
CREATE TABLE Books (
    ISBN VARCHAR(20) PRIMARY KEY,
    Title VARCHAR(200),
    Synopsis VARCHAR(2000),
    DatePublished DATE,
    CoverImage VARCHAR(500),
    AvgRating DECIMAL(3,2)
);

-- Authors
CREATE TABLE Authors (
    AuthorID INT PRIMARY KEY AUTO_INCREMENT,
    AuthorName VARCHAR(200)
);

-- BookAuthors (junction)
CREATE TABLE BookAuthors (
    ISBN VARCHAR(20),
    AuthorID INT,
    PRIMARY KEY (ISBN, AuthorID),
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID)
);

-- Genres
CREATE TABLE Genres (
    GenreID INT PRIMARY KEY AUTO_INCREMENT,
    GenreName VARCHAR(200)
);

-- BookGenres (junction)
CREATE TABLE BookGenres (
    ISBN VARCHAR(20),
    GenreID INT,
    PRIMARY KEY (ISBN, GenreID),
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
);

-- Ratings
CREATE TABLE Ratings (
    RatingID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    ISBN VARCHAR(20),
    RatingValue INT,
    Description VARCHAR(1000),
    Date DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN)
);