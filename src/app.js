// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
  res.status(200).send('Authentication successful');
});

module.exports = app;
