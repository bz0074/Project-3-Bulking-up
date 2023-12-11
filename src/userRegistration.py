from flask import Flask, request, jsonify
import sqlite3
import uuid
from argon2 import PasswordHasher

app = Flask(__name__)
ph = PasswordHasher()

# Create SQLite database and users table
conn = sqlite3.connect('your_database.db')
cursor = conn.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        email TEXT UNIQUE,
        date_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
    )
''')
conn.close()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = str(uuid.uuid4())

    hashed_password = ph.hash(password)

    # Save user details to the database
    conn = sqlite3.connect('your_database.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)", (username, hashed_password, email))
    conn.commit()
    conn.close()

    return jsonify({"password": password}), 201
