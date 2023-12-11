from flask import Flask, request, jsonify
from argon2 import PasswordHasher
import sqlite3
import uuid

app = Flask(__name__)

# Password Hasher Configuration
ph = PasswordHasher()

# Authentication Endpoint
@app.route('/auth', methods=['POST'])
def authenticate_user():
    # Log request details
    request_ip = request.remote_addr
    user_id = get_user_id(request.json['username'])

    conn = sqlite3.connect('your_database.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO auth_logs (request_ip, user_id) VALUES (?, ?)', (request_ip, user_id))
    conn.commit()
    conn.close()

    # Authentication logic
    username = request.json['username']
    password = request.json['password']

    user = get_user(username)
    if user and ph.verify(user['password_hash'], password):
        return jsonify({"message": "Authentication successful"}), 200
    else:
        return jsonify({"message": "Authentication failed"}), 401

def get_user(username):
    conn = sqlite3.connect('your_database.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    conn.close()
    return user

def get_user_id(username):
    user = get_user(username)
    return user[0] if user else None

