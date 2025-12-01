import requests
import mysql.connector
from datetime import date

# ============= CONFIG =============
DB_CONFIG = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "password",
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
    resp = requests.get(url, params=params)
    resp.raise_for_status()
    return resp.json().get("docs", [])


def fetch_description(work_key: str | None) -> str | None:
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


def insert_book(cur, isbn, title, synopsis, year):
    """
    Insert or update a row in Book.
    Now also stores a cover image URL based on ISBN.
    """
    pub_date = date(int(year), 1, 1) if year else None

    # OpenLibrary cover image URL for this ISBN
    cover_url = f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"

    sql = """
        INSERT INTO Book (ISBN, Title, Synopsis, DatePublished, CoverImage)
        VALUES (%s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            Title = VALUES(Title),
            Synopsis = VALUES(Synopsis),
            DatePublished = VALUES(DatePublished),
            CoverImage = VALUES(CoverImage)
    """
    cur.execute(sql, (isbn, title, synopsis, pub_date, cover_url))


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
    """
    Insert genre for this ISBN.
    We will ensure in Python that we only ever call this once per ISBN.
    """
    sql = """
        INSERT IGNORE INTO Genres (ISBN, GenreName)
        VALUES (%s, %s)
    """
    cur.execute(sql, (isbn, genre_name))


def load_books_all_genres():
    cnx = get_connection()
    cur = cnx.cursor()

    total_books = 0

    # Track which ISBNs already got a genre
    genres_assigned = set()

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

            if description:
                synopsis = description[:2000]
            else:
                # fallback system
                subtitle = doc.get("subtitle") or ""
                subjects = doc.get("subject", [])

                if subtitle:
                    synopsis = subtitle
                elif subjects:
                    synopsis = f"A book about {subjects[0]}."
                else:
                    synopsis = f"A book titled '{title}'."

                synopsis = synopsis[:2000]

            year = doc.get("first_publish_year")

            # Insert / update book
            insert_book(cur, isbn, title, synopsis, year)
            total_books += 1

            # Insert authors
            for name in doc.get("author_name", []):
                first, last = split_author_name(name)
                if first is None and last is None:
                    continue
                insert_author(cur, isbn, first, last)

            # ✅ ONE GENRE PER ISBN:
            # Only assign a genre if this ISBN doesn't have one yet.
            if isbn not in genres_assigned:
                insert_genre(cur, isbn, genre)
                genres_assigned.add(isbn)

        cnx.commit()
        print(f"Finished genre: {genre}")

    cur.close()
    cnx.close()
    print(f"Total books processed (docs seen): {total_books}")


if __name__ == "__main__":
    load_books_all_genres()
