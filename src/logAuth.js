// Define authentication endpoint
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
