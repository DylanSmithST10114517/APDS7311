const router = require('express').Router();
const auth = require('../middleware/auth'); // Import the 'auth' middleware
const { Post, validatePost } = require('../models/post'); // Import the 'Post' model and 'validatePost' function

// GET [Auth] - Retrieve all posts
router.get('/', auth, async (req, res) => {
    try {
        // Fetch all posts from the database
        const posts = await Post.find();
        
        // Send the retrieved posts as a response
        res.send(posts);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send(error.message);
    }
});

// GET [Auth] - Retrieve a post by ID
router.get('/:id', auth, async (req, res) => {
    try {
        // Find a post by its ID
        const post = await Post.findById(req.params.id);

        // If the post is found, send it as a response
        if (post) return res.send(post);

        // If no post is found with the given ID, send a 404 Not Found status
        res.sendStatus(404);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send(error.message);
    }
});

// POST [Auth] - Create a new post
router.post('/', auth, async (req, res) => {
    try {
        // Validate the incoming post data using Joi
        const { error } = validatePost(req.body);

        // If validation fails, send a 400 Bad Request status with error details
        if (error) return res.status(400).json(error.details[0].message);

        // Create a new post using the request body
        const post = new Post(req.body);

        // Save the new post to the database
        await post.save();

        // Send the created post as a response
        res.send(post);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send(error.message);
    }
});

// DELETE [Auth] - Remove a post by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        // Delete a post by its ID
        const result = await Post.deleteOne({ _id: req.params.id });

        // Send the result of the deletion as a response
        res.send(result);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send(error.message);
    }
});

module.exports = router;
