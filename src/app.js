// app.js

const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const argon2 = require('argon2');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('your_database.db');

// AES Encryption Functions
const encryptionKey = process.env.NOT_MY_KEY;

function encryptPrivateKey(privateKey) {
    const cipher = crypto.createCipher('aes-256-ctr', encryptionKey);
    let encryptedKey = cipher.update(privateKey, 'utf-8', 'hex');
    encryptedKey += cipher.final('hex');
    return encryptedKey;
}

function decryptPrivateKey(encryptedKey) {
    const decipher = crypto.createDecipher('aes-256-ctr', encryptionKey);
    let decryptedKey = decipher.update(encryptedKey, 'hex', 'utf-8');
    decryptedKey += decipher.final('utf-8');
    return decryptedKey;
}

// User Registration Route
app.post('/register', async (req, res) => {
    const { username, email } = req.body;

    // Generate a secure password using UUIDv4
    const password = crypto.randomBytes(16).toString('hex');

    // Hash the password using Argon2
    const passwordHash = await argon2.hash(password);

    // Store user details and hashed password in the database
    db.run('INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)', [username, passwordHash, email], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ password });
    });
});

// Authentication Route
app.post('/auth', (req, res) => {
    const { username, password } = req.body;

    // Log authentication request details
    db.run('INSERT INTO auth_logs (request_ip, user_id) VALUES (?, (SELECT id FROM users WHERE username = ?))', [req.ip, username], (err) => {
        if (err) {
            console.error('Error logging authentication request:', err);
        }
    });

    //  authentication logic goes here...

    res.status(200).send('Authentication successful');
});

// Example Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, welcome to the JWKS server!' });
});

module.exports = app;
