const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const argon2 = require('argon2');
const uuid = require('uuid');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('your_database.db');

// Load the encryption key from the environment variable
const encryptionKey = process.env.NOT_MY_KEY;

// Function to encrypt private keys
function encryptPrivateKey(privateKey) {
    const cipher = crypto.createCipher('aes-256-ctr', encryptionKey);
    let encryptedKey = cipher.update(privateKey, 'utf-8', 'hex');
    encryptedKey += cipher.final('hex');
    return encryptedKey;
}

// Function to decrypt private keys
function decryptPrivateKey(encryptedKey) {
    const decipher = crypto.createDecipher('aes-256-ctr', encryptionKey);
    let decryptedKey = decipher.update(encryptedKey, 'hex', 'utf-8');
    decryptedKey += decipher.final('utf-8');
    return decryptedKey;
}

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Set up rate limiter
const limiter = rateLimit({
    windowMs: 1000, // 1 second window
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too Many Requests',
    statusCode: 429,
});

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

// Define authentication endpoint with rate limiter middleware
app.post('/auth', limiter, (req, res) => {
    const { username, password } = req.body;

    // Log authentication request details
    db.run('INSERT INTO auth_logs (request_ip, user_id) VALUES (?, (SELECT id FROM users WHERE username = ?))', [req.ip, username], (err) => {
        if (err) {
            console.error('Error logging authentication request:', err);
        }
    });

    // Your authentication logic goes here...

    res.status(200).send('Authentication successful');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
