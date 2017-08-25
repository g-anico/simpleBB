const db = require("../models")

const LoggedUser = function(data) {
    this.username = data.username;
    this.uid = data.id
    this.usertype = data.userType;
    this.userstatus = data.status;
    this.createdAt = data.createdAt;
};

module.exports = app => {
app.get("/sup", (req, res) => {
    res.json(req.originalUrl)
})
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
            if(data.length) {
                res.render("index", { data: data, userInfo: userInfo });
            } else {
                db.User.findAll({
                    where: {
                        userType: "admin"
                    }
                }).then(admins => {
                    if(!admins.length) {
                        res.render("install");
                    } else {
                        res.redirect("/admin")
                    }
                });
            }
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
        db.Forum.findOne({
            where: {
                id: forumID
            },
            include: [{
                model: db.Topic,
                include: [{
                    model: db.Post,
                    include: db.User
                }]
            }]
        }).then(data => {
            res.render("viewforum", {data: data, userInfo: userInfo})
        })

    });

// Topic page. Show all posts(comments) for the topic
    app.get("/viewtopic", (req, res) => {
        var userInfo;
        if(req.user) {
            userInfo = new LoggedUser(req.user);
        }
        var topicID = req.originalUrl.split("?id=")[1];
        if(!topicID) { res.redirect("/404"); }
        db.Topic.findOne({
            where: {
                id: topicID
            },
            include: [{
                model: db.Post,
                include: [db.User]
            }]
        }).then(data => {
            res.render("viewtopic", { data: data, userInfo: userInfo })
        });
    });

    app.get("/admin", (req, res) => {
        if(req.user) {
            if(req.user.userType === "admin") {
                db.Category.findAll({
                    include: [db.Forum]
                }).then(data => {
                    res.render("admin", { data: data, userInfo: req.user });
                });
            } else {
                res.render("login");
            }
        } else {
            res.render("login");
        }
    });

// Post replies & new topics
    app.get("/post", (req, res) => {
        var userInfo;
        if(req.user) {
            userInfo = new LoggedUser(req.user);
        } else {
            res.render("login");
            return;
        }

        var params = req.originalUrl.split("?")[1];
        if(!params) {
            res.send("404");
        } else if(params[0] === "f") {     // f = forum, this is when user is posting a new topic. Get forum ID to place under which forum.
            var postPre = params.split("=");
            res.render("newtopic", { userInfo: userInfo, fid: postPre[1] });
            // res.json({userInfo: userInfo, fid:postPre[1]})
        } else if(params[0] === "t") {      // t = topic, this is when user is posting a comment to a topic. Get topic ID to place under.
            var postPre = params.split("=");
            res.render("newpost", { userInfo: userInfo, tid: postPre[1] });
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
