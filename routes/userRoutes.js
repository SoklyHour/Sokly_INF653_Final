// Import express and create a router
const express = require('express');
const router = express.Router();
// Import the user controller
const userController = require('../controllers/userController');

// Route to create a new user (for admin or testing)
router.post('/', userController.createUser);
// Route to get all users (for admin)
router.get('/', userController.getAllUsers);

// Export the router to be used in the main app
module.exports = router;