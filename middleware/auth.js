// Import the 'jsonwebtoken' library
const jwt = require('jsonwebtoken');

// Middleware function for authentication
function auth(req, res, next) {
  // Get the JWT token from the 'x-auth-token' header in the request
  const token = req.header('x-auth-token');
  let id;

  try {
    // Verify the JWT token and extract the 'userId' from it
    const { userId } = jwt.verify(token);
    id = userId;
  } catch (err) {
    // If there's an error during token verification, return a 401 Unauthorized status
    return res.sendStatus(401);
  }

  // If 'id' is successfully obtained from the token, set it in the request's 'user' property
  if (id) {
    req.user = { id };
    return next(); // Proceed to the next middleware or route handler
  }

  // If 'id' is not obtained, return a 401 Unauthorized status
  res.sendStatus(401);
}

// Export the 'auth' middleware for use in other parts of the application
module.exports = auth;
