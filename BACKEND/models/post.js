// Import the 'joi' library for data validation
const joi = require('joi');

// Import the 'mongoose' library for defining and working with MongoDB schemas
const mongoose = require('mongoose');

// Define the schema for a 'Post' document in MongoDB
const postschema = new mongoose.Schema(
    {
        title: String,
        description: String,
        departmentCode: String
    }
);

// Create a 'Post' model based on the 'postschema' schema
const Post = mongoose.model('Post', postschema);

// Function to validate a 'post' object using Joi schema validation
function validatePost(post) {
    // Define a Joi schema for validating the 'post' object's properties
    const schema = joi.object({
        title: joi.string().min(3).max(50).required(),
        description: joi.string().min(3).max(100).required(),
        departmentCode: joi.string().min(1).max(50).required()
    });
    
    // Validate the 'post' object against the defined schema
    return schema.validate(post);
}

// Export the 'Post' model and the 'validatePost' function for use in other parts of the application
module.exports = { Post, validatePost };
