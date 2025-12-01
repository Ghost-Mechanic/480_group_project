USE cs480_group_project;

SELECT COUNT(*) FROM Book;
SELECT COUNT(*) FROM Genres;

-- make sure no ISBN appears more than once in Genres
SELECT ISBN, COUNT(*) AS c
FROM Genres
GROUP BY ISBN
HAVING c > 1;
