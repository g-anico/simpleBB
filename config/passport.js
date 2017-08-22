const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy
    db = require("../models");

// Keep authentication state across HTTP requests
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb){
    cb(null, obj);
});

// Passport strategy for new user creations
passport.use("local-signup", new LocalStrategy(
    {usernameField: "username", passwordField: "password", passReqToCallback: true},
    function(req, username, password, done) {
        console.log(req.body);
        db.User.findOne({
            where: {
                username:username
            }
        }).then(function(dbUser) {
            if(dbUser) {
                return done(null, false, req.flash("signupMessage", "Sorry, mate, some bloke already took that username. Bummer."));
            }
            db.User.create({
                username: username,
                password: password,
                email: req.body.email
            }).then(function(newUser, created, err) {
                if(!newUser) {
                    return done(null, false);
                }
                return done(null, newUser);
            });
        });
    }
));

// Passport strategy for logins
passport.use("local-signin", new LocalStrategy(
    function(username, password, done) {
        db.User.findOne({
            where: {
                username: username
            }
        }).then(function(dbUser) {
            if(!dbUser) {
                return done(null, false, req.flash("loginMessage", "Incorrect username or password."));
            } else if(!dbUser.validPassword(password)) {
                return done(null, false, req.flash("loginMessage", "Incorrect username or password."));
            }

            return done(null, dbUser);
        });
    }
));

module.exports = passport;
