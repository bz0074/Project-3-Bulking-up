const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const argon2 = require('argon2');
const uuid = require('uuid');

const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('your_database.db');

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Define user registration endpoint
app.post('/register', async (req, res) => {
    const { username, email } = req.body;

    // Generate a secure password using UUIDv4
    const password = uuid.v4();

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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
