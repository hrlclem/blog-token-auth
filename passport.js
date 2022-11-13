require('dotenv').config()
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require("./models/users")
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    function (username, password, cb) {
        return Users.findOne({username, password})
                .then(user => {
                    if (!user) {
                        return cb(null, false, {message: 'Incorrect username or password.'});
                    }
                    return cb(null, user, {message: 'Logged In Successfully'});
                })
                .catch(err => cb(err));
    }
));



// Token initialization
// ISSUE COMES FROM HERE ==> FUNCTION NEVER CALLED
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_TOKEN,
  }, 
  function (jwtPayload, cb) {
    return Users.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
    }
));

//   (jwtPayload, done) => {
//     console.log(jwtPayload)
//     Users.getUserById(jwtPayload.id, (err, user) => {
//       if(err){
//       return done(err, false);
//       }
      
//       if(user){
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     });
//   }
// ));