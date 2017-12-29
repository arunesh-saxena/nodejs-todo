var db = require('../models'),
  CONSTANTS = require('../constants');

var getList = function (req, res) {
  //get data from mongdb and pass it to view
  db.Todo.find({}, function (err, data) {
    if (err) {
      res.status(CONSTANTS.serCode.ISE).json({
        success: false,
        message: err
      });
      throw err;
    } else {
      res.status(CONSTANTS.serCode.success).json({
        success: true,
        todos: data
      });
    }
  })
};
var addTodo = function (req, res) {
  //get data from the view and add it ti mongodb
  let body = req.body;
  var newTodo = db.Todo(body).save(function (err, data) {
    if (err) {
      res.status(CONSTANTS.serCode.ISE).json({
        success: false,
        message: err
      });
      throw err;
    } else {
      res.status(CONSTANTS.serCode.success).json({
        success: true,
        data: data
      });
    }
  })
}
var updateTodo = function (req, res) {
  var body = req.body;
  var set = {};
  set = Object.assign(set, body);
  delete set['id'];
  db.Todo.update({ id: req.body.id }, {
    $set: set
  },
    function (err, data) {
      if (err) {
        res.status(CONSTANTS.serCode.ISE).json({
          success: false,
          message: err
        });
      } else {
        db.Todo.find({}, function (err, data) {
          if (err) {
            res.status(CONSTANTS.serCode.ISE).json({
              success: true,
              data: data
            });
          } else {
            res.status(CONSTANTS.serCode.success).json({
              success: true,
              data: data
            });
          }
        })

      }
      // res.json(data)
    });
};

var deleteTodo = function (req, res) {
  // delete the requested item from mongodb
  db.Todo.find({ id: req.params.id }).remove(function (err, data) {
    if (err) {
      res.status(CONSTANTS.serCode.ISE).json({
        success: false,
        message: err
      });
    } else {
      db.Todo.find({}, function (err, data) {
        if (err) {
          res.status(CONSTANTS.serCode.ISE).json({
            success: true,
            data: data
          });
        } else {
          res.status(CONSTANTS.serCode.success).json({
            success: true,
            data: data
          });
        }
      })

    }
  })
  // res.json(data)
};

module.exports = {
  getTodolist: getList,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
  get: (req, res) => {
    res.json({
      message: 'this is msg'
    });
  }
}
