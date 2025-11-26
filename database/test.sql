USE cs480_group_project;

SELECT COUNT(*) FROM Book;
SELECT COUNT(*) FROM Author;
SELECT COUNT(*) FROM Genres;

SELECT ISBN, Title, LEFT(Synopsis, 120) AS Preview
FROM Book
LIMIT 10;
