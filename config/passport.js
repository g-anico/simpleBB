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
passport.use("local-login", new LocalStrategy(
    {passReqToCallback: true},
    function(req, username, password, done) {
        db.User.findOne({
            where: {
                username: username
            }
        }).then(function(dbUser) {
            console.log("db?")
            if(!dbUser) {
                console.log('wrong user')
                return done(null, false, req.flash("loginError", "Incorrect username or password."));
            } else if(!dbUser.validPassword(password)) {
                console.log('wrong pass')
                return done(null, false, req.flash("loginError", "Incorrect username or password."));
            }

            return done(null, dbUser);
        }).catch(function(err) {
            console.log(err)
        });
    }
));

module.exports = passport;
