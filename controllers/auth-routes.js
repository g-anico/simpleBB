const passport = require("../config/passport");

module.exports = app => {
    app.post("/login", passport.authenticate("local-signin", {
        failureRedirect: "/login",
        successRedirect: "/",
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
