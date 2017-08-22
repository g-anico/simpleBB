const express = require("express"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    passport = require("./config/passport"),
    PORT = process.env.PORT || 3000,
    db = require("./models"),
    flash = require("connect-flash")
    exphbs = require("express-handlebars"),
    app = express();

// Body-parser stuff.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Passport & Sessions
app.use(session({ secret: "lolcat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Static Files
app.use("/public", express.static(__dirname + "/public"));

// Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
require("./controllers/html-routes.js")(app)
require("./controllers/api-routes.js")(app)

// Start DB, Start Express Server
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("We're on at " + PORT);
    });
});
