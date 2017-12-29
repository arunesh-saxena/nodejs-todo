var express = require('express');
var routes = express.Router();
var session = require('express-session');
var cors = require('cors');

/* controllers */
var todoCtrl = require('../controllers/todoController'),
    userCtrl = require('../controllers/userController'),
    postCtrl = require('../controllers/postController'),
    commentCtrl = require('../controllers/commentController'),
    menuCtrl = require('../controllers/menuController');

var CONSTANTS = require('../constants');


var sess = '';
/* routes.use('/', function (req, res, next) {
    // console.log('/ for rotuers middle ware');
    // next();
}); */

var isAuthenticated = (req, res, next) => {
    let sess = req.session;
    if (sess._id && sess.username) {
        next();
    } else {
        res.status(CONSTANTS.serCode.unauthorized).send(CONSTANTS.getSerMsg(CONSTANTS.serCode.unauthorized, CONSTANTS.serMsg.inValidUser));
    }
};
var issue2options = {
    origin: [CONSTANTS.allowedOrigin, CONSTANTS.allowedOrigin2, CONSTANTS.allowedOrigin3],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 3600
};
routes.use(cors(issue2options));
/* routes.all('*', function (req, res, next) {
    // console.log(req.sessionID)
    res.header('Access-Control-Allow-Origin', CONSTANTS.allowedOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}); */
/* Todo Controllers */
routes.get('/', isAuthenticated, function (req, res) {
    sess = req.session;
    res.json({
        sessionID: req.sessionID,
        sesionData: sess,
        cookies: req.cookies
    });
});

routes.get('/getTodolist', isAuthenticated, todoCtrl.getTodolist);

routes.post('/addTodo', todoCtrl.addTodo);

routes.put('/updateTodo', todoCtrl.updateTodo);

routes.delete('/deleteTodo/:id', todoCtrl.deleteTodo);

/* User routes*/

routes.post('/singup', userCtrl.singUp);

routes.post('/login/', userCtrl.login);

routes.get('/logout', userCtrl.logout);
// routes.post('/logout', userCtrl.logout);

/* Post routes */
routes.post('/post', postCtrl.post);

routes.get('/posts', postCtrl.getAll);

/* Comments routes */
routes.post('/comment', commentCtrl.comment);

routes.get('/comments', commentCtrl.get);

/* Restro start */
routes.post('/menu/add/', menuCtrl.addMenu);

routes.get('/menu/list/', menuCtrl.getMenuList);

/* Restro end */

/* testing */

routes.get('/test', function (req, res) {
    res.render('test');
})



module.exports = routes;
