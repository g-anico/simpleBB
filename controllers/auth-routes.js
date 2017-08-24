const passport = require("../config/passport");

module.exports = app => {
    app.post("/login", (req, res, next) => {
        passport.authenticate("local-login", (err, user, info) => {
            if(err) { return (err); }
            if(!user) { return res.json("failed"); }
            req.logIn(user, err => {
                if(err) { return (err); }
                return res.redirect("back");
            });
        })(req, res, next);
    });

    app.post("/signup", (req, res, next) => {
        passport.authenticate("local-signup", (err, user, info) => {
            if(err) { return err; }
            if(!user) { return res.json("failed"); }
            req.logIn(user, err => {
                if(err) { return err; }
                return res.redirect("back");
            });
        })(req, res, next);
    });

    app.post("/adminreg", (req, res, next) => {
        passport.authenticate("admin-signup", (err, user, info) => {
            if(err) { return err; }
            if(!user) { return res.json("failed"); }
            req.logIn(user, err => {
                if(err) { return err; }
                return res.redirect("/admin");
            });
        })(req, res, next);
    });
    
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

}
