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

// Create Admins
passport.use("admin-signup", new LocalStrategy(
    {usernameField: "username", passwordField: "password", passReqToCallback: true},
    function(req, username, password, done) {
        username = username.toLowerCase();
        db.User.findOne({
            where: {
                username:username
            }
        }).then(function(dbUser) {
            if(dbUser) {
                return done(null, false);
            }
            db.User.create({
                username: username,
                password: password,
                email: req.body.email,
                userType: "admin"
            }).then(function(newUser, created, err) {
                if(!newUser) {
                    return done(null, false);
                }
                return done(null, newUser);
            });
        });
    }
));

// Passport strategy for new user creations
passport.use("local-signup", new LocalStrategy(
    {usernameField: "username", passwordField: "password", passReqToCallback: true},
    function(req, username, password, done) {
        username = username.toLowerCase();
        db.User.findOne({
            where: {
                username:username
            }
        }).then(function(dbUser) {
            if(dbUser) {
                return done(null, false);
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
        username = username.toLowerCase();
        db.User.findOne({
            where: {
                username: username
            }
        }).then(function(dbUser) {
            if(!dbUser) {
                return done(null, false);
            } else if(!dbUser.validPassword(password)) {
                return done(null, false);
            }

            return done(null, dbUser);
        }).catch(function(err) {
            console.log(err)
        });
    }
));

module.exports = passport;
