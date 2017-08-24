const db = require("../models");
function newPost(data, tid, res) {
    db.Post.create(data).then(xdata => {
        db.Topic.update({
            latestPost: xdata.id,
            updatedAt: xdata.createdAt
        }, {
            where: {
                id: tid
            }
        }).then(result => {
            res.redirect("/viewtopic?id=" + tid);
        });
    });
};

module.exports = app => {
// Create new topic
    app.post("/newtopic", (req, res) => {
        if(req.user) {
        // Insert the new topic into the database first.
            let newTopic = req.body;
            db.Topic.create({
                title: newTopic.title,
                ForumId: newTopic.ForumId,
                UserId: newTopic.UserId,
                latestPost: 0
            }).then(data => {
            // After topic is inserted, insert the data for the first post.
                let topicID = data.id;
                let firstPost = {
                    post: newTopic.post,
                    UserId: newTopic.UserId,
                    TopicId: topicID
                }
                newPost(firstPost, topicID, res);
            });
        } else {
            res.json("Sneaky sneaky."); // With how handlebars will build the sites, this api should not be accesible through the frontend UI. But you can still hit it in other ways.
        }
    });


// Write new post
    app.post("/newpost", (req, res) => {
        if(!req.user) {
            res.json("Nope");
        } else {
            let postComment = {
                post: req.body.post,
                UserId: req.body.UserId,
                TopicId: req.body.TopicId
            }
            newPost(postComment, req.body.TopicId, res);
        }
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
