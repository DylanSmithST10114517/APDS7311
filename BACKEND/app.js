// Import required libraries
require('dotenv').config();
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const hsts = require('./middleware/hsts'); // Import HSTS middleware
const mongoose = require('mongoose');
const helmet = require('helmet'); // Import helmet for security headers
const cors = require('cors'); // Import CORS middleware

// Connect to MongoDB using the connection string
mongoose.connect(process.env.CONNSTRING);

// Middleware section

// Enable security-related HTTP headers using helmet
app.use(helmet());

// Parse JSON requests
app.use(express.json());

// Enable HTTP Strict Transport Security (HSTS) using the 'hsts' middleware
app.use(hsts);

// Configure CORS settings to allow requests from a specific origin
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token");

    res.header(
        "Access-Control-Expose-Headers",
        "x-access-token"
    );
    next();
})

// Routes section

// Define routes for user-related functionality
app.use('/api/user', require('./routes/user'));

// Define routes for posts-related functionality
app.use('/api/posts', require('./routes/posts'));

// Define a test route to check if the server is working
app.get('/test', (req, res) => {
    res.send('test worked');
});

// Server section

// Create an HTTPS server using provided key and certificate, and listen on port 3000
https.createServer({
    key: fs.readFileSync('./keys/privatekey.pem'),
    cert: fs.readFileSync('./keys/certificate.pem')
}, app).listen(3000);
