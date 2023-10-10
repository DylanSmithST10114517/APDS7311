// Import the 'joi' library for data validation
const joi = require('joi');

// Import the 'mongoose' library for defining and working with MongoDB schemas
const mongoose = require('mongoose');

// Define the schema for a 'User' document in MongoDB
const userschema = new mongoose.Schema(
    {
        // Define the 'username' field with a unique constraint
        username: { type: String, unique: true },
        
        // Define the 'email' field with a unique constraint
        email: { type: String, unique: true },
        
        // Define the 'password' field
        password: String,
    }
);

// Create a 'User' model based on the 'userschema' schema
const User = mongoose.model('User', userschema);

// Function to validate a 'user' object using Joi schema validation
function validateUser(user) {
    // Define a Joi schema for validating the 'user' object's properties
    const schema = joi.object({
        username: joi.string().min(3).max(50).required(),
        email: joi.string().min(3).max(50).required(),
        password: joi.string().min(3).max(50).required()
    });
    
    // Validate the 'user' object against the defined schema
    return schema.validate(user);
}

// Export the 'User' model and the 'validateUser' function for use in other parts of the application
module.exports = { User, validateUser };