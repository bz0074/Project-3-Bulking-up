# Project-3-Bulking-up
# JWKS Server

This project is a JWKS (JSON Web Key Set) server with enhanced security features, user registration, authentication logging, and optional rate limiting. The server is built using Node.js and Express, with data storage handled by SQLite.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [Testing](#testing)
  - [Test Coverage](#test-coverage)
- [Endpoints](#endpoints)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **AES Encryption of Private Keys:**
   - Private keys are encrypted using AES with a key provided from the `NOT_MY_KEY` environment variable.

2. **User Registration:**
   - User registration endpoint (`POST /register`) to securely register users.
   - Passwords are generated using UUIDv4, hashed with Argon2, and stored in the database.

3. **Logging Authentication Requests:**
   - Authentication requests are logged into the `auth_logs` table, including request IP, timestamp, and user ID.

4. **Rate Limiter (Optional):**
   - Optional time-window rate limiter for the `POST /auth` endpoint, limiting requests to 10 per second.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- SQLite

### Installation

1. Clone the repository:

   ```bash
   git clone 
   cd jwks-server
