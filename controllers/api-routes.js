module.exports = app => {
    app.get("/user_data", (req, res) => {
        if(!req.user) {
            res.json({});
        }

        res.json({
            username: req.user.username,
            userType: req.user.userType,
            status: req.user.status
        });
    });
}
