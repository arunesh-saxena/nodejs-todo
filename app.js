var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var session = require('express-session');
var path = require('path');
// var RedisStore = require('connect-redis')(session);
// var redis = require("redis");
// var client = redis.createClient();

mongoose.Promise = global.Promise; /* to make promise in mongoose */

var router = require('./src/routes/router'),
    CONSTANTS = require('./src/constants');
    
var app = express();

//Connect to the database
mongoose.connect("mongodb://localhost:27017/todo", function (err, db) {
    if (!err) {
        console.log("We are connected");
    } else {
        console.log("We are not connected");
    }
});
/* mongoose.connect("mongodb://test:test@localhost:27017/todo", function (err, db) {
    if (!err) {
        console.log("We are connected");
    }
}); */

//Middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');/* for tamplating */
app.set('views', path.join(__dirname + '/src/views'));/* set view path */

app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/',
        // domain: 'http://localhost:4200',
        secure: false,
        httpOnly: false,
        maxAge: CONSTANTS.sessionTimeout
    },
    // store: new RedisStore({
    //     host: 'localhost',
    //     port: 6379,
    //     client: client,
    //     ttl: 260
    // })
}));
/* Error handling middleware */
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(CONSTANTS.serCode.ISE).send(CONSTANTS.getSerMsg[CONSTANTS.serCode.ISE])
})


/* app.use('/api',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    // res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // res.header('Access-Control-Allow-Credentials', true);
    return next();
}); */
/* app.use('/api', function (req, res, next) {
    // console.log('/api middle ware');
    next();
}); */
app.use('/api', router);

module.exports = app;
