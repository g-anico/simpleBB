const passport = require("../config/passport");

module.exports = app => {
    // app.post("/login", passport.authenticate("local-login", {
    //     failureRedirect: "/login",
    //     successRedirect: "back",
    //     failureFlash: true
    // }));
    app.post("/login", (req, res, next) => {
        passport.authenticate("local-login", (err, user, info) => {
            if(err) { return (err); }
            if(!user) { return res.json({ login: false }); }
            req.logIn(user, err => {
                if(err) { return (err); }
                return res.redirect("back");
            });
        })(req, res, next)
    })
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
