import sqlite3

def init_db():
    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT UNIQUE NOT NULL
        )
    """)
    connection.commit()
    connection.close()