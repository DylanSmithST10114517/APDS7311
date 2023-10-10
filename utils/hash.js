// Import the 'bcrypt' library for password hashing and validation
const bcrypt = require('bcrypt');

// Function to hash a password using bcrypt
async function hashPassword(password) {
    // Generate a salt for hashing with 12 rounds of salting
    const salt = await bcrypt.genSalt(12);
    
    // Hash the password using the generated salt
    const hashed = await bcrypt.hash(password, salt);
    
    // Return the hashed password
    return hashed;
}

// Function to validate a password by comparing it to a stored hash
async function isValidPassword(password, hash) {
    // Compare the provided password to the stored hash
    return await bcrypt.compare(password, hash);
}

// Export the 'hashPassword' and 'isValidPassword' functions for use in other parts of the application
module.exports = { hashPassword, isValidPassword };
