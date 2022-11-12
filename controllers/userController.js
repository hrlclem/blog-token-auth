const Users = require("../models/users")
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const passport = require("passport");



exports.users_list = (req,res) => {               // Display all users page GET
  res.render('index', { title: 'USERS'});
};
exports.profile_detail = (req,res) => {           // Display profile page GET
  res.render('profile', { title: 'PROFILE'});
};





exports.signup_get = (req,res) => {               // Display signup GET
  res.render('signup', { title: 'Please sign-up' });
};






exports.signup_post = [                           // Process signup POST
  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape(),
	body("password")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confPassword")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async (value, { req }) => {
        if (value !== req.body.password) throw new Error('Passwords must be the same');
        return true;
      }),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("signup", { title: "Sign Up", passwordConfirmationError: "Passwords must be the same!" });
    }

    try {
      const isUserInDB = await Users.find({ "username": req.body.username });
      if (isUserInDB.length > 0) return res.render("signup", { title: "Sign Up", error: "User already exists" });
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);

        const user = new Users({
          name: req.body.name,
          surname: req.body.surname,
          username: req.body.username,
          password: hashedPassword,
        });
        
        user.save(err => {
          if(err){
            res.redirect("/users/auth/signup")
            next(err)
          }
          else 
          {
            res.redirect('/users/profile');   
          }
      });
    })
    }
    catch (err) {
      return next(err);
    }
  }
];

exports.login_get = (req,res) => {               // Display login page GET
  res.render('login', { title: 'LOGIN' });
};
exports.login_post = (req,res) => {               // Process login  POST
  res.render('login', { title: 'LOGIN' });
};

exports.nologin_get = (req,res) => {               // NO LOGIN page
  res.render('nologin', { title: 'NOLOGIN' });
};

