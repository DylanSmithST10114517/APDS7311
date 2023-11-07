// Middleware function for HTTP Strict Transport Security (HSTS)
function hsts(req, res, next) {
    // Check if the request is made over a secure connection (HTTPS)
    if (req.secure) {
        // Set the Strict-Transport-Security header to instruct browsers to use HTTPS for a long duration
        res.setHeader('Strict-Transport-Security',
            'max-age=31536000; includeSubDomains; preload'
        );
    }
    // Continue to the next middleware or route handler
    next();
}

// Export the 'hsts' middleware for use in other parts of the application
module.exports = hsts;
