USE cs480_group_project;

DROP TABLE IF EXISTS Rating;
DROP TABLE IF EXISTS Genres;
DROP TABLE IF EXISTS Author;
DROP TABLE IF EXISTS Book;
DROP TABLE IF EXISTS Customer;

CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    UserName VARCHAR(50),
    PasswordHash VARCHAR(255),
    Email VARCHAR(100),
    DateCreated DATE
);

CREATE TABLE Book (
    ISBN VARCHAR(20) PRIMARY KEY,
    Title VARCHAR(200),
    Synopsis VARCHAR(7000),
    DatePublished DATE,
    AvgRating DECIMAL(3,2) NULL   
);

CREATE TABLE Author (
    ISBN VARCHAR(20),
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    PRIMARY KEY (ISBN, FirstName, LastName),
    FOREIGN KEY (ISBN) REFERENCES Book(ISBN)
);

CREATE TABLE Genres (
    ISBN VARCHAR(20),
    GenreName VARCHAR(100),
    PRIMARY KEY (ISBN, GenreName),
    FOREIGN KEY (ISBN) REFERENCES Book(ISBN)
);


CREATE TABLE Rating (
    RatingID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    ISBN VARCHAR(20),
    UserName VARCHAR(50),
    RatingValue INT,
    Description VARCHAR(1000),
    CreatedAt DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (ISBN) REFERENCES Book(ISBN)
);
