const express = require('express');
const router = express.Router();

const user_controller = require("../controllers/userController")

// -.com/users/-
router.get('/', user_controller.users_list);                // Display all users page GET
router.get('/:profileid', user_controller.profile_detail);  // Display profile page GET

router.get('/signup', user_controller.signup_get);          // Process signup GET
router.post('/signup', user_controller.signup_post);        // Process signup POST
router.get('/login', user_controller.login_get);            // Display login page POST
router.post('/login', user_controller.login_post);          // Process login  POST

// Logout


module.exports = router;