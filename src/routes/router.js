var express = require('express');
var routes = express.Router();
// var session = require('express-session');
var cors = require('cors');
var multer = require('multer');
var jwt = require('jsonwebtoken');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        let info = file.originalname.split('.');
        const ext = info[info.length - 1];
        cb(null, `${info[0]}-${Date.now()}.${ext}`)
    }
});

var upload = multer({ storage: storage }).single('imageURL');

routes.post('/imageUpload', upload, function (req, res) {
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

let token_secret = 'iy98hcbh489n38984y4h498';

var isAuthenticated = (req, res, next) => {
    // check for token in the header first, then if not provided, it checks whether it's supplied in the body of the request
  var token = req.headers['x-access-token'] || req.body.token;
  console.log(token)
  if (token) {
    jwt.verify(token, token_secret, function (err, decoded) {
      if (!err) {
        req.decoded = decoded; // this add the decoded payload to the client req (request) object and make it available in the routes
        next();
      } else {
        res.status(403).send('Invalid token supplied');
      }
    })
  } else {
    res.status(403).send('Authorization failed! Please provide a valid token');
  }
};
var issue2options = {
    origin: [CONSTANTS.allowedOrigin, CONSTANTS.allowedOrigin2, CONSTANTS.allowedOrigin3, CONSTANTS.allowedOrigin4],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 3600
};
routes.use(cors(issue2options));
/* routes.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', CONSTANTS.allowedOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}); */

routes.get('/getTodolist', isAuthenticated, todoCtrl.getTodolist);

routes.post('/addTodo', todoCtrl.addTodo);

routes.put('/updateTodo', todoCtrl.updateTodo);

routes.delete('/deleteTodo/:id', todoCtrl.deleteTodo);

/* User routes*/

routes.post('/singup', userCtrl.singUp);

routes.post('/login/', userCtrl.login);

routes.get('/logout', userCtrl.logout);
// routes.post('/logout', userCtrl.logout);
/* check is user is loggin on server */
routes.post('/isLogin',isAuthenticated, (req, res) => {
    console.log('---------isLogin--------');
    console.log(req.decoded);
    res.json({
        success: true,
        data: {
            "token": req.decoded
        }
    });
});

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
    res.json({
        success: true,
        data: { msg: 'testing done' }
    });
})



module.exports = routes;
