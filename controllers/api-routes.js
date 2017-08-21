const db = require("../models"),
    passport = require("../config/passport");

module.exports = app => {
    app.post("/login", passport.authenticate("local-signin"), (req, res) => {

    });

    app.post("/signup", passport.authenticate("local-signup", {
        failureRedirect: "/failed",
        successRedirect: "/",
        failureFlash: true
    }));

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/user_data", (req, res) => {
        if(!req.user) {
            res.json({});
        }

        res.json({
            username: req.user.username,
            userType: req.user.userType,
            status: req.user.status
        });
    });
}
