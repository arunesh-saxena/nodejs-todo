var db = require('../models'),
    bcrypt = require('bcryptjs'),
    session = require('express-session'),
    CONSTANTS = require('../constants'),
    sess = '';
var singUp = function (req, res) {
    let username = req.body.username,
        email = req.body.email,
        password = req.body.password,
        role = req.body.role,
        passwordHash = '';
    db.User.findOne({
        $or: [
            { 'username': username },
            { 'email': email }]
    }).then(data => {
        if (!data) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    // Store hash in your password DB.
                    passwordHash = hash;
                    // db.User.on('index', function (error) {
                    db.User({ username: username, 'email': email, password: passwordHash, role: role }).save().then((data) => {
                        delete data.password;
                        res.status(CONSTANTS.serCode.success).json({
                            success: true,
                            data: data
                        });
                    }).catch(err => {
                        res.status(CONSTANTS.serCode.forbidden).json({
                            success: false,
                            message: err
                        });
                    });
                    // });
                });
            });
        } else {
            res.status(CONSTANTS.serCode.forbidden).json({
                success: false,
                message: `${(username == data.username ? username : '')} ${(username == data.username && email == data.email) ? 'and' : ''} ${(email == data.email ? email : '')} is already exsit.`
            });
        }

    }).catch(err => {
        res.status(CONSTANTS.serCode.ISE).json({
            success: false,
            message: err
        })
    })


}

var login = function (req, res) {
    console.log(req.body)
    db.User.findOne({ username: req.body.username }).then(user => {
        console.log(user)
        if (user) {
            bcrypt.compare(req.body.password, user.password).then((result) => {
                delete user.password;
                delete user['password'];
                if (result) {
                    sess = req.session;
                    sess.username = user.username;
                    sess._id = user._id;
                    sess.email = user.email;
                    res.status(CONSTANTS.serCode.success).json({
                        success: true,
                        data: {
                            "_id": user._id,
                            "username": user.username,
                            email: user.email,
                            "__v": user.__v,
                            "createdAt": user.createdAt,
                            "isDeleted": user.isDeleted
                        }
                    });
                } else {
                    res.status(CONSTANTS.serCode.success).json({
                        success: false,
                        message: 'username and password does\'t not match.'
                    });
                }
            });
        }else{
            res.status(CONSTANTS.serCode.success).json({
                success: false,
                message: 'username  not found.'
            })
        }


    }).catch(err => {
        console.log(err)
        res.status(CONSTANTS.serCode.ISE).json({
            success: false,
            message: JSON.stringify(err)
        })
    });
}

var logout = (req, res) => {
    let username = sess.username;
    req.session.destroy(function (err) {
        if (err) {
            throw (err);

            res.status(CONSTANTS.serCode.ISE).json({
                success: false,
                message: err
            });
        } else {
            res.status(CONSTANTS.serCode.success).json({
                success: true,
                message: `${username} logout successfully.`
            });
        }
    });
}

module.exports = {
    singUp: singUp,
    login: login,
    logout: logout
}