const express = require("express");

module.exports = app => {
    app.get("/", (req, res) => {
        userInfo = req.user;
        if(userInfo) {
            res.render("index", { user: {name: req.user.username, type: req.user.userType} });
        } else {
            res.render("index");
        }
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
