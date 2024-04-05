const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Function to validate email domain
function validateEmailDomain(email, allowedDomains) {
    // Extract the domain part of the email address
    const [, domain] = email.split('@');

    // Check if the domain is in the list of allowed domains
    return allowedDomains.includes(domain);
}

// Example usage:
const allowedDomains = ["university.edu"]; // List of allowed domains

// Route to handle email validation
app.post('/validate-email', (req, res) => {
    const { email } = req.body;

    if (validateEmailDomain(email, allowedDomains)) {
        res.json({ message: "Email domain is allowed." });
    } else {
        res.status(400).json({ error: "Email domain is not allowed." });
    }
});

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
