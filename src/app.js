// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database(':memory:'); // Use ':memory:' for in-memory database

// Create tables if they do not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      email TEXT UNIQUE,
      date_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS auth_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      request_ip TEXT NOT NULL,
      request_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});


// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Hello, this is the root endpoint!');
});

app.post('/register', (req, res) => {
  // Handle registration logic here
  res.status(201).send('User registered successfully!');
});

app.post('/auth', (req, res) => {
  // Handle authentication logic here
  res.status(200).send('Authentication successful!');
});

module.exports = app;


