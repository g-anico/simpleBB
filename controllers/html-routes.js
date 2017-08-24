const db = require("../models")

const LoggedUser = function(data) {
    this.username = data.username;
    this.usertype = data.userType;
    this.userstatus = data.status;
    this.createdAt = data.createdAt;
};

module.exports = app => {

// Main page - Show all categories and their forums
    app.get("/", (req, res) => {
        var userInfo;
        if(req.user) {
            userInfo = new LoggedUser(req.user);
        }
        db.Category.findAll({
            include: [db.Forum],
            order: [["id"]]
        }).then(data => {
            res.render("index", { data: data, userInfo: userInfo });
        });
    });

// Forum page. Show all topics for this forum
    app.get("/viewforum", (req, res) => {
        var userInfo;
        if(req.user) {
            userInfo = new LoggedUser(req.user);
        }
        var forumID = req.originalUrl.split("?id=")[1];
        if(!forumID) { res.redirect("/404"); }
        db.Topic.findAll({
            where: {
                ForumId: forumID
            },
            order: [["updatedAt", "DESC"]]
        }).then(data => {
            res.json({ data: data, userInfo: userInfo });
        });
    });

// Topic page. Show all posts(comments) for the topic
    app.get("/viewtopic", (req, res) => {
        var userInfo;
        if(req.user) {
            userInfo = new LoggedUser(req.user);
        }
        var topicID = req.originalUrl.split("?id=")[1];
        if(!topicID) { res.redirect("/404"); }
        db.Post.findAll({
            where: {
                TopicId: topicID
            },
            order: [["createdAt"]]
        }).then(data => {
            res.json({ data: data, userInfo: userInfo });
        })
    });

    app.get("/test", (req, res) => {
        if(req.user) {
        let userInfo = new LoggedUser(req.user)
        res.render("index", {userInfo: userInfo});}
        else {res.render("index")}
    });

// Post replies & new topics
    app.get("/post", (req, res) => {
        var userInfo;
        if(req.user) {
            userInfo = new LoggedUser(req.user);
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

    });

// User profile page. (WORK ON THIS PART LAST IF WE HAVE TIME)
    app.get("/user/:username", (req, res) => {
        if(req.user) {
            var userInfo = new LoggedUser(req.user);
        }

        var profileUser = req.params.username;
    });
}
