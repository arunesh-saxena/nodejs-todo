var db = require('../models');

var comment = function (req, res) {
    let {
        text,
        userId,
        postId
    } = req.body;

    console.log(req.body);

    //validation

    let comment = new db.Comment({
        text,
        _creator: userId,
        _post: postId
    });

    comment.save(function (err, newComment) {
        if (err) {
            return res.status(500).json({
                message: err.toString()
            });
        } else {

            db.Post.findByIdAndUpdate(
                postId,
                { $push: { '_comments': newComment._id } }
            ).then((existingPost) => {

                res.status(200).json({
                    success: true,
                    data: newComment,
                    existingPost: existingPost
                });
            }).catch((err) => {
                return res.status(500).json({
                    message: err.toString()
                });
            });
        }
    })/* .catch((err) => {
        return res.status(500).json({
            message: err.toString()
        });
    }); */
}

let get = (req, res) => {
    db.Comment.find({}).then((data) => {
        res.status(200).json({
            success: true,
            data: data
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err.toString()
        });
    });
}

module.exports = {
    comment: comment,
    get: get
}