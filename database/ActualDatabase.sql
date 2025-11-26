USE bookoverflow;

-- --------------------------
-- Customers Table
-- --------------------------
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerName VARCHAR(200),
    UserName VARCHAR(50),
    Email VARCHAR(100),
    PasswordHash VARCHAR(255),
    Address VARCHAR(500),
    CreatedAt DATE
);

-- --------------------------
-- Books Table
-- --------------------------
CREATE TABLE Books (
    ISBN VARCHAR(20) PRIMARY KEY,
    Title VARCHAR(200),
    Synopsis VARCHAR(2000),
    OverallRating DECIMAL(3,2),
    DatePublished DATE,
    CoverImage VARCHAR(500),
    Cost DECIMAL(6,2)
);

-- --------------------------
-- Authors Table
-- --------------------------
CREATE TABLE Authors (
    AuthorID INT PRIMARY KEY AUTO_INCREMENT,
    AuthorName VARCHAR(100)
);

-- --------------------------
-- Genres Table
-- --------------------------
CREATE TABLE Genres (
    GenreID INT PRIMARY KEY AUTO_INCREMENT,
    GenreName VARCHAR(100)
);

-- --------------------------
-- BookAuthors (junction)
-- --------------------------
CREATE TABLE BookAuthors (
    ISBN VARCHAR(20),
    AuthorID INT,
    PRIMARY KEY (ISBN, AuthorID),
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID)
);

-- --------------------------
-- BookGenres (junction)
-- --------------------------
CREATE TABLE BookGenres (
    ISBN VARCHAR(20),
    GenreID INT,
    PRIMARY KEY (ISBN, GenreID),
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
);

-- --------------------------
-- Ratings Table
-- --------------------------
CREATE TABLE Ratings (
    RatingID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    BookID VARCHAR(20),
    RatingValue INT,
    Description VARCHAR(1000),
    CreatedAt DATE,
    FOREIGN KEY (UserID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (BookID) REFERENCES Books(ISBN)
);