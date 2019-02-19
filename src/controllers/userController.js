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
                        res.json({
                            success: true,
                            data: data
                        });
                    }).catch(err => {
                        res.json({
                            success: false,
                            data: err
                        });
                    });
                });
            });
        } else {
            res.json({
                success: false,
                data: {
                    message: `${(username == data.username ? username : '')} ${(username == data.username && email == data.email) ? 'and' : ''} ${(email == data.email ? email : '')} is already exsit.`
                }
            });
        }

    }).catch(err => {
        res.json({
            success: false,
            data: err
        })
    })
    // res.json({
    //     success: false,
    //     data: {
    //         message: 'something went wrong'
    //     }
    // })
    /* todo: need to handle when DB connection is not available */


}

var login = function (req, res) {
    db.User.findOne({ username: req.body.username }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password).then((result) => {
                delete user.password;
                delete user['password'];
                if (result) {
                    sess = req.session;
                    sess.username = user.username;
                    /* sess._id = user._id;
                    sess.email = user.email; */
                    res.json({
                        success: true,
                        data: {
                            "username": user.username
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'username and password does\'t not match.'
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: 'username  not found.'
            })
        }


    }).catch(err => {
        console.log(err)
        res.json({
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
            res.json({
                success: false,
                message: err
            });
        } else {
            res.json({
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