const rateLimit = require('express-rate-limit');

// Set up rate limiter
const limiter = rateLimit({
    windowMs: 1000, // 1 second window
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too Many Requests',
    statusCode: 429,
});

// Apply rate limiter middleware to the authentication endpoint
app.post('/auth', limiter, (req, res) => {
    // Your authentication logic goes here...

    res.status(200).send('Authentication successful');
});
