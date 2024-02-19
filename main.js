// app.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { runRconCommand } = require('./rcon'); // Import the function from rcon.js

const app = express();
const PORT = 3000; // Choose any available port

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'html' directory
app.use(express.static(path.join(__dirname, 'html')));

// Serve static files from the 'resources' directory
app.use('/resources', express.static(path.join(__dirname, 'html', 'resources')));

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'login2.html'));
});

// Route to handle form submission
app.post('/', (req, res) => {
    const user_text = req.body.user_text;
    console.log(user_text);
    // Send user_text to rcon.js
    runRconCommand(user_text); // Pass user_text to the function
    res.send('Button click received successfully!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
