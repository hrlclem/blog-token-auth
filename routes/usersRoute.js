const express = require('express');
const router = express.Router();
// const passport = require("passport");
// const jwt = require('jsonwebtoken');

require('../passport');

const user_controller = require("../controllers/userController")

const freeAccess = (req, res, next) => {
    if (req.user) {
      return next();
    }
    res.redirect("/users/auth/nologin");
  };


// -.com/users/-
router.get('/', user_controller.users_list);                     // Display all users page GET
router.get('/profile',                                           // Display profile page GET
    freeAccess,
    // passport.authenticate('jwt', {session: false}),            // Check if authorized
    user_controller.profile_detail
); 

router.get('/auth/signup', user_controller.signup_get);          // Process signup GET
router.post('/auth/signup', user_controller.signup_post);        // Process signup POST
router.get('/auth/login', user_controller.login_get);            // Display login page POST

router.get('/auth/nologin', user_controller.nologin_get);        // No Login error page


module.exports = router;