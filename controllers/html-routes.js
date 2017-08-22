const db = require("../models")

const LoggedUser = function(data) {
    this.username = data.username;
    this.usertype = data.userType;
    this.userstatus = data.status;
    this.createdAt = data.createdAt;
}

module.exports = app => {

// Main page - Show all categories and their forums
    app.get("/", (req, res) => {
        if(req.user) {
            var userInfo = new LoggedUser(req.user);
        }
        res.json(userInfo);
    });

// Forum page. Show all topics for this forum
    app.get("/viewforum", (req, res) => {
        if(req.user) {
            var userInfo = new LoggedUser(req.user);
        }

        var forumID = req.originalUrl.split("?id=")[1];
    });

// Topic page. Show all posts(comments) for the topic
    app.get("/viewtopic", (req, res) => {
        if(req.user) {
            var userInfo = new LoggedUser(req.user);
        }

        var topicID = req.originalUrl.split("?id=")[1];
    });

// Post replies & new topics
    app.get("/post", (req, res) => {
        if(req.user) {
            var userInfo = new LoggedUser(req.user);
        } else {
            res.redirect("/login");
        }

        var params = req.originalUrl.split("?")[1];
        if(params[0] === "f") {     // f = forum, this is when user is posting a new topic. Get forum ID to place under which forum.
            var postPre = params.split("=");
            res.render("newTopic", { userInfo: userInfo, fid: postPre[1] });
        } else if(params[0] === "t") {      // t = topic, this is when user is posting a comment to a topic. Get topic ID to place under.
            var postPre = params.split("=");
            res.render("newPost", { userInfo: userInfo, tid: postPre[1] });
        }

    })

// User profile page. (WORK ON THIS PART LAST IF WE HAVE TIME)
    app.get("/user/:username", (req, res) => {
        if(req.user) {
            var userInfo = new LoggedUser(req.user);
        }

        var profileUser = req.params.username;
    });
}
