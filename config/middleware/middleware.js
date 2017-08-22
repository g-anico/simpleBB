module.exports = (req, res, action) => {
    if(req.user) {
        return action();
    }
}
