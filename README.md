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


How to run my program: 
clone the project
cd to the src file
then npm start 
you will need to install : npm install express-rate-limit
then the running will start and you will have where the4 server is running

you need to go the the tests directory and 
npm test 
npm install chai --save-dev
npm test
npm run coverage 


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bz0074/Project-3-Bulking-up.git
   cd jwks-server



###Screenshots

<img width="758" alt="Screenshot 2023-12-11 at 10 17 20 PM" src="https://github.com/bz0074/Project-3-Bulking-up/assets/128610052/0b948f89-04ed-4ec8-ac43-c9556204bef3">
<img width="761" alt="Screenshot 2023-12-11 at 10 15 28 PM" src="https://github.com/bz0074/Project-3-Bulking-up/assets/128610052/60f8e829-b65c-4bf6-8bcb-001203aec8a3">
<img width="757" alt="Screenshot 2023-12-11 at 10 15 16 PM" src="https://github.com/bz0074/Project-3-Bulking-up/assets/128610052/9304abcd-cd1f-4f42-baf4-efd440d85ef3">
<img width="886" alt="Screenshot 2023-12-11 at 8 57 28 PM" src="https://github.com/bz0074/Project-3-Bulking-up/assets/128610052/d86d43bb-5d40-405c-a6e2-bc5d322a6fcd">
<img width="891" alt="Screenshot 2023-12-11 at 8 57 13 PM" src="https://github.com/bz0074/Project-3-Bulking-up/assets/128610052/b17c451a-4c3c-4113-bd5b-f81729ed756f">


