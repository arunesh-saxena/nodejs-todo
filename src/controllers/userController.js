var db = require('../models'),
    bcrypt = require('bcryptjs'),
    session = require('express-session'),
    CONSTANTS = require('../constants'),
    jwt = require('jsonwebtoken');
let token_secret = CONSTANTS.token_secret;

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
                    // 1. here our payload contains data we want client to hold for when next they send us any request
                    const payload = {
                        email: user.email,
                        username: user.username,
                        id: user._id
                    }
                    // 2. then we use jwt to sign our payload with our secret defined token_secret
                    let token = jwt.sign(payload, token_secret, { expiresIn: '1h' });
                    res.json({
                        success: true,
                        data: {
                            "username": user.username,
                            token
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
/* TODO: hanlde JWT token  */
    res.json({
        success: true,
        message: `Logout successfully.`
    });
}

module.exports = {
    singUp: singUp,
    login: login,
    logout: logout
}