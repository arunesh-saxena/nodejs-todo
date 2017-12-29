var db = require('../models'),
    CONSTANTS = require('../constants');

var post = (req, res) => {
    let {
        title,
        text,
        link,
        userId,
    } = req.body;
    //validation for title text link
    console.log(req.body);
    let post = new db.Post({
        title,
        text,
        link,
        _creator: userId
    });

    post.save(function (err, data) {
        if (err) {
            res.status(CONSTANTS.serCode.ISE).json({
                success: false,
                message: err
            });
            throw err;
        } else {

            console.log(data)
            res.status(CONSTANTS.serCode.success).json({
                success: true,
                data: data
            });
        }
    });
}
getAll = (req, res) => {
    db.Post.find({}).populate({
        path: '_creator',
        select: 'username isDeleted createdAt -_id'
    }).populate({
        path: '_comments',
        select: 'text isDeleted _creator createdAt',
        match: { 'isDeleted': false }
    }).then((posts) => {
        return res.status(CONSTANTS.serCode.success).json({
            success: true,
            data: posts
        })
    }).catch(err => {
        return res.status(CONSTANTS.serCode.ISE).json({
            message: err
        })
    })
}

module.exports = {
    post: post,
    getAll: getAll
}