-- Data inserted

INSERT INTO Authors (AuthorName)
VALUES 
    ('Mitch Albom'),
    ('Simone Elkeles');
    
INSERT INTO Genres (GenreName)
VALUES
    ('Fiction'),
    ('Romance'),
    ('Inspirational'),
    ('Young Adult');

INSERT INTO Books (ISBN, Title, Synopsis, OverallRating, DatePublished, CoverImage, Cost)
VALUES
    ('9781401322786', 'The Time Keeper', 'A story about the first man who counted time.', 4.5, '2012-09-04', NULL, 12.99),
    ('9781401308582', 'The Five People You Meet in Heaven', 'A look at the afterlife and human connections.', 4.6, '2003-09-23', NULL, 10.99),
    ('9780062294432', 'The Next Person You Meet in Heaven', 'The sequel to The Five People You Meet in Heaven.', 4.4, '2018-10-09', NULL, 13.99),
    ('9780385484510', 'Tuesdays with Morrie', 'Life lessons from a dying professor.', 4.8, '1997-08-18', NULL, 9.99),
    
    ('9780802798237', 'Perfect Chemistry', 'Opposites attract in this romance.', 4.3, '2008-12-23', NULL, 11.99),
    ('9780802720863', 'Rules of Attraction', 'A companion novel following the next Fuentes brother.', 4.2, '2010-04-27', NULL, 11.99),
    ('9780802798229', 'Leaving Paradise', 'A story about a girl and the boy who changed her life.', 4.1, '2007-04-01', NULL, 10.99),
    ('9780802720857', 'Chain Reaction', 'The youngest Fuentes brother finds love.', 4.1, '2011-08-16', NULL, 11.99),
    ('9780802720796', 'Return to Paradise', 'The sequel to Leaving Paradise.', 4.0, '2010-09-01', NULL, 10.99);
    
    INSERT INTO BookAuthors (ISBN, AuthorID)
VALUES
    -- Mitch Albom
    ('9781401322786', 1),
    ('9781401308582', 1),
    ('9780062294432', 1),
    ('9780385484510', 1),

    -- Simone Elkeles
    ('9780802798237', 2),
    ('9780802720863', 2),
    ('9780802798229', 2),
    ('9780802720857', 2),
    ('9780802720796', 2);
    
    INSERT INTO BookGenres (ISBN, GenreID)
VALUES
    -- Mitch Albom (Fiction = 1, Inspirational = 3)
    ('9781401322786', 1),
    ('9781401322786', 3),
    
    ('9781401308582', 1),
    ('9781401308582', 3),
    
    ('9780062294432', 1),
    ('9780062294432', 3),

    ('9780385484510', 1),
    ('9780385484510', 3),

    -- Simone Elkeles (Romance = 2, Young Adult = 4)
    ('9780802798237', 2),
    ('9780802798237', 4),

    ('9780802720863', 2),
    ('9780802720863', 4),

    ('9780802798229', 2),
    ('9780802798229', 4),

    ('9780802720857', 2),
    ('9780802720857', 4),

    ('9780802720796', 2),
    ('9780802720796', 4);