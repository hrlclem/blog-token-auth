require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require('body-parser');
const app = express();
require('./passport');

const jwt = require('jsonwebtoken');

const indexRouter = require('./routes/indexRoute');
const usersRouter = require('./routes/usersRoute');
const articlesRouter = require('./routes/articlesRoute');

const Users = require("./models/users")


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Auth setup
app.use(session({ 
  name: 'sessionCookie',
  secret: `${process.env.SECRET_SESSION}`, 
  resave: true, 
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Server setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(`${process.env.SECRET_SESSION}`));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/users',  usersRouter);
app.use('/articles', articlesRouter);
// app.use('/articles/:articleid/comments', commmentsRouter);



//Local Strategy authentification
passport.use(new LocalStrategy((username, password, done) => {
    Users.findOne({ username: username }, (err, user) => {
      if (err) { return done(err) }

      if (!user) { return done(null, false, { message: "Incorrect username" }) }

      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(err);
        if (res) return done(null, user);
        else return done(null, false, { message: "Incorrect password" });
      });
    });
  })
);

// Login middleware
passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

passport.deserializeUser(function(id, done) {
      Users.findById(id, (err, user) => {
        if(err){
            done(null, false, {error:err});
        } else {
            done(null, user);
        }
    })
});


//Login
app.post('/login', function (req, res, next) {
  passport.authenticate('local', {session: true}, (err, user, info) => {
      if (err || !user) {
          return res.status(400).json({
              message: 'Something is not right',
              user : user
          });
      }
          
      req.login(user, {session: true}, (err) => {
          if (err) {
              res.send(err);
          }

      // const token = "Bearer " + jwt.sign(user.toJSON(), process.env.SECRET_TOKEN, { expiresIn: 60 * 60 });
      const token = jwt.sign(user.toJSON(), process.env.SECRET_TOKEN, { expiresIn: 60 * 60 });
      res.locals.currentUser = req.user
      res.locals.currentToken = token
      return res.redirect('/');
      // return res.redirect('/users/profile');
    });
  })(req, res);
});




// Logout function
app.get("/logout", (req, res, next) => {
  console.log("logout")
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





// Import the mongoose module
const mongoose = require("mongoose");
const JsonWebTokenError = require('jsonwebtoken/lib/JsonWebTokenError');
// Set up default mongoose connection
const mongoDB = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@inventory-app.tdcky6s.mongodb.net/token?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// Get the default connection
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


module.exports = app;
