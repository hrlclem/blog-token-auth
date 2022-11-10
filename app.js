require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const commmentsRouter = require('./routes/comments');

const Users = require("./models/users")

const app = express();

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
app.use(express.urlencoded({ extended: false }));

// Server setup
app.use(logger('dev'));
app.use(cookieParser(`${process.env.SECRET_SESSION}`));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/articles/:articleid/comments', commmentsRouter);

//Local Strategy authentification
passport.use(
  new LocalStrategy((username, password, done) => {
    Users.findOne({ username: username }, 
      (err, user) => {
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

app.post("/login", (req, res, next) => {
  console.log("running")
    passport.authenticate('local', {
      session: true,
      successRedirect: "/users/profile",
      failureRedirect: "/auth/nologin",
    }, 
    (err, user, info) => {     
      console.log("step1")
 
      if (err) {
          return res.status(401).json(err);
      }
      if (user) {
          const token = jwt.sign(user, process.env.SECRET_TOKEN);
          return res.status(200).json({
              user:user,
              token:token
          });
      } else {
          res.status(401).json(info);
      }
    })(req, res, next);
})


// BASIC LOGIN STRATEGY
// app.post("/log-in",
//     passport.authenticate("local", {
//       session: true,
//       successRedirect: "/users/profile",
//       failureRedirect: "/auth/nologin",
//   })
// );
  

app.post('/login', (req, res, next) => {
  console.log("all good so far1")

  passport.authenticate('local', {session: true}, (err, user) => {
      console.log("all good so far2")
      if (err) {return next(err)};
      if (!user) {return res.redirect('/', {error: "Couldn't find the user", user: user})}

      req.login(user, {session: true}, (err) => {
        if (err) {console.log("err 1"); return next(err) }
      
      console.log("all good so far3")
      const token = jwt.sign(user, process.env.SECRET_TOKEN);
        return res.json({user, token});
      });
  })
});


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : process.env.SECRET_TOKEN,
},
function (jwtPayload, done) {
  return UserModel.findOneById(jwtPayload.id)
      .then(user => {
          return done(null, user);
      })
      .catch(err => {
          return done(err);
      });
}
));



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
// Set up default mongoose connection
const mongoDB = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@inventory-app.tdcky6s.mongodb.net/token?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// Get the default connection
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


module.exports = app;
