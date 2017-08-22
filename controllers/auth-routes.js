const passport = require("../config/passport");

module.exports = app => {
    app.post("/login", passport.authenticate("local-login", {
        failureRedirect: "/failed",
        successRedirect: "back",
        failureFlash: true
    }));

    app.post("/signup", passport.authenticate("local-signup", {
        failureRedirect: "/signup",
        successRedirect: "/",
        failureFlash: true
    }));

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/signup", (req, res) => {
        if(req.user) {
            res.redirect("/");
        } else {
            res.render("signup", { message: req.flash("signupMessage") });
        }
    });

    app.get("/login", (req, res) => {
        if(req.user) {
            res.redirect("/");
        } else {
            res.render("login", { message: req.flash("loginMessage") });
        }
    });
}
