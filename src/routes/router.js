var express = require('express');
var routes = express.Router();
var session = require('express-session');
var cors = require('cors');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        let info = file.originalname.split('.');
        const ext = info[info.length-1];
        cb(null, `${info[0]}-${Date.now()}.${ext}`)
    }
});

var upload = multer({storage: storage}).single('imageURL');

routes.post('/imageUpload',upload, function (req, res) {
    console.log('hello', req.body)
   
});

/* controllers */
var todoCtrl = require('../controllers/todoController'),
    userCtrl = require('../controllers/userController'),
    postCtrl = require('../controllers/postController'),
    commentCtrl = require('../controllers/commentController'),
    menuCtrl = require('../controllers/menuController'),
    orderCtrl = require('../controllers/orderController');

var CONSTANTS = require('../constants');

var sess = '';

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

routes.post('/menu/add/', upload, menuCtrl.addMenu);

routes.get('/menu/list/', menuCtrl.getMenuList);

routes.post('/order/add/', orderCtrl.addOrder);

routes.put('/order/:id/', orderCtrl.updateOrder);

routes.get('/order/:id', orderCtrl.getOrder);

routes.get('/orders/', orderCtrl.getOrderList);

/* Restro end */

/* testing */

routes.get('/test', function (req, res) {
    // res.status(CONSTANTS.serCode.success).json({
    //         success: false,
    //         data: {msg:'testing done'}
    //       });
     res.render('test');
})
routes.get('/testApi', function (req, res) {
    res.status(CONSTANTS.serCode.success).json({
            success: false,
            data: {msg:'testing done'}
          });
})



module.exports = routes;
