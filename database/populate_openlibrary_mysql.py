import requests
import mysql.connector
from datetime import date

# ============= CONFIG =============
DB_CONFIG = {
    "host": "127.0.0.1",
    "user": "cs480",
    "password": "cs480pass",
    "database": "cs480_group_project",
}

# Fetch books from ONLY these 10 genres
GENRE_TERMS = [
    "fantasy",
    "romance",
    "mystery",
    "science fiction",
    "history",
    "biography",
    "children",
    "young adult",
    "philosophy",
    "business"
]

BOOK_LIMIT = 50   # ~10 × 50 = ~500 books

# Polished fallback descriptions if the OpenLibrary description is missing/bad
GENERIC_DESCRIPTIONS = {
    "fantasy": "A fantasy story featuring imaginative worlds, magical elements, and adventurous characters.",
    "romance": "A heartfelt romance exploring relationships, emotions, and meaningful connections.",
    "mystery": "A suspenseful mystery centered around secrets, clues, and unexpected twists.",
    "science fiction": "A science fiction narrative exploring futuristic ideas, advanced technology, and speculative concepts.",
    "history": "A historical work reflecting events, cultures, and perspectives from the past.",
    "biography": "A biographical account detailing the life, experiences, and journey of a notable figure.",
    "children": "A children's book crafted to spark imagination and engage young readers.",
    "young adult": "A young adult novel examining themes of identity, relationships, and coming-of-age.",
    "philosophy": "A philosophical text examining deep questions, ideas, and theories about life and thought.",
    "business": "A business-focused book offering insights into strategy, leadership, and professional development."
}
# ==================================


def get_connection():
    return mysql.connector.connect(**DB_CONFIG)


def fetch_books(query, limit=100, offset=0):
    """
    Call Open Library Search API and return docs[] list.
    We request 'key' so we can fetch full descriptions per work.
    """
    url = "https://openlibrary.org/search.json"
    params = {
        "q": query,
        "limit": limit,
        "offset": offset,
        "fields": "key,title,subtitle,isbn,first_publish_year,author_name,subject",
    }
    # IMPORTANT: pass params so the query + limit are used
    resp = requests.get(url, params=params, timeout=10)
    resp.raise_for_status()
    return resp.json().get("docs", [])


def fetch_description(work_key):
    """
    Fetch real description from OpenLibrary Work API.
    Returns a string or None.
    work_key looks like '/works/OL12345W'.
    """
    if not work_key:
        return None

    url = f"https://openlibrary.org{work_key}.json"

    try:
        resp = requests.get(url, timeout=5)
        if resp.status_code != 200:
            return None

        data = resp.json()
        desc = data.get("description")

        # description may be dict or plain string
        if isinstance(desc, dict):
            return desc.get("value")
        elif isinstance(desc, str):
            return desc
        else:
            return None
    except Exception:
        return None


def is_bad_description(text: str | None) -> bool:
    """
    Returns True if description is missing, empty,
    too short, or clearly low-quality.
    """
    if not text:
        return True
    text = text.strip()
    if len(text) < 40:  # extremely short or useless blurbs
        return True
    if text.lower() in {"description unavailable", "n/a", "none"}:
        return True
    return False


def insert_book(cur, isbn, title, synopsis, year):
    """Insert or update a row in Book."""
    pub_date = date(int(year), 1, 1) if year else None

    sql = """
        INSERT INTO Book (ISBN, Title, Synopsis, DatePublished)
        VALUES (%s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            Title = VALUES(Title),
            Synopsis = VALUES(Synopsis),
            DatePublished = VALUES(DatePublished)
    """
    cur.execute(sql, (isbn, title, synopsis, pub_date))


def split_author_name(full_name: str):
    """Split into first and last name."""
    parts = full_name.strip().split()
    if not parts:
        return None, None

    if len(parts) == 1:
        return None, parts[0][:100]

    first = " ".join(parts[:-1])[:100]
    last = parts[-1][:100]
    return first, last


def insert_author(cur, isbn, first, last):
    sql = """
        INSERT IGNORE INTO Author (ISBN, FirstName, LastName)
        VALUES (%s, %s, %s)
    """
    cur.execute(sql, (isbn, first, last))


def insert_genre(cur, isbn, genre_name):
    sql = """
        INSERT IGNORE INTO Genres (ISBN, GenreName)
        VALUES (%s, %s)
    """
    cur.execute(sql, (isbn, genre_name))


def load_books_all_genres():
    cnx = get_connection()
    cur = cnx.cursor()

    total_books = 0

    for genre in GENRE_TERMS:
        print(f"Fetching books for genre: {genre}...")
        docs = fetch_books(genre, limit=BOOK_LIMIT)

        for doc in docs:
            isbns = doc.get("isbn")
            if not isbns:
                continue

            isbn = isbns[0][:20]
            title = (doc.get("title") or "Unknown title")[:200]

            # ---- Build synopsis using real description if available ----
            work_key = doc.get("key")
            description = fetch_description(work_key)

            clean_genre = genre.lower().strip()

            if description and not is_bad_description(description):
                # Good real description from OpenLibrary
                synopsis = description[:2000]
            else:
                # Fallback polished description based on genre, or title
                synopsis = GENERIC_DESCRIPTIONS.get(
                    clean_genre,
                    f"A book titled '{title}'."
                )

            year = doc.get("first_publish_year")

            # Insert book
            insert_book(cur, isbn, title, synopsis, year)
            total_books += 1

            # Insert authors
            for name in doc.get("author_name", []):
                first, last = split_author_name(name)
                if first is None and last is None:
                    continue
                insert_author(cur, isbn, first, last)

            # Insert ONE genre per book, based on the search term
            insert_genre(cur, isbn, genre)

        cnx.commit()
        print(f"Finished genre: {genre}")

    cur.close()
    cnx.close()
    print(f"Total books processed: {total_books}")


if __name__ == "__main__":
    load_books_all_genres()



