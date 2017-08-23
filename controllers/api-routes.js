const db = require("../models");

module.exports = app => {
// Create new topic
    app.post("/newtopic", (req, res) => {
        if(req.user) {
        // Insert the new topic into the database first.
            let newTopic = req.body;
            db.Topic.create({
                title: newTopic.title,
                ForumId: newTopic.fid,
                UserId: newTopic.uid
            }).then(data => {
            // After topic is inserted, insert the data for the first post.
                let topicID = data.id;
                db.User.create({
                    post: newTopic.post,
                    UserId: newTopic.uid
                }).then(xdata => {
                // Send user to the newly created topic.
                    res.redirect("/viewtopic?id=" + topicID);
                });
            });
        }
        res.json("Sneaky sneaky."); // With how handlebars will build the sites, this api should not be accesible through the frontend UI. But you can still hit it in other ways.
    });

// Write new post
    app.post("newpost", (req, res) => {
        if(!req.user) {
            res.json("Nope");
        }

        let newPost = req.body;
        db.Post.create({
            post: newPost.post,
            UserId: newPost.uid,
            TopicId: newPost.tid
        }).then(data => {
            db.Topic.update({
                latestPost: data.id,
                updateAt: data.createdAt
            },
            {
                where: {
                    id: newPost.tid
                }
            }).then(data => {
                res.redirect("/viewtopic?id=" + newPost.tid);
            });
        });
    });

// Edit post
    app.put("", (req, res) => {
        if(!req.user) { res.json("( ͡° ͜ ʖ ͡°)"); }
        let updatePost = req.body;
        db.Post.update({
            post: updatePost.post
        }).then(data => {
            res.redirect("/viewtopic?id=" + updatePost.tid);
        });
    });
}
