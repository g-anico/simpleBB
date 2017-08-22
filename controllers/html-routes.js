const db = require("../models")

const LoggedUser = function(data) {
    this.username = data.username;
    this.usertype = data.userType;
    this.userstatus = data.status;
    this.createdAt = data.createdAt;
}

module.exports = app => {
    app.get("/", (req, res) => {
        if(req.user) {
            var userInfo = new LoggedUser(req.user);
        }
        res.json(userInfo);
    });

    app.get("/viewforum", (req, res) => {
        if(req.user) {
            var userInfo = new LoggedUser(req.user);
        }

        var forumID = req.originalUrl.split("?id=")[1];
    });

    app.get("/viewtopic", (req, res) => {
        if(req.user) {
            var userInfo = new LoggedUser(req.user);
        }

        var topicID = req.originalUrl.split("?id=")[1];
    });
}
