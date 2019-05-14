var db = require('../models'),
  CONSTANTS = require('../constants');

var addMenu = (req, res) => {
  let body = req.body;
  if (req.file && req.file.path) {
    body.imageURL = req.file && req.file.path;
  }

  var menuMenu = db.Menu(body).save(function (err, data) {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    } else {
      res.json({
        success: true,
        data: data
      });
    }
  });
}

var getMenuList = (req, res) => {
  db.Menu.find({}, function (err, data) {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    } else {
      res.json({
        success: true,
        data: data
      });
    }
  })
}

var getMenuItem = (req, res) => {
  const itemId = req.params.itemID;
  db.Menu.findOne({ id: itemId }, function (err, data) {
    if (err) {
      res.json({
        success: false,
        message: err
      });
    } else {
      res.json({
        success: true,
        data: data
      });
    }
  })
};

var updateMenuItem = (req, res) => {
  let body = req.body;
  if (req.file && req.file.path) {
    body.imageURL = req.file && req.file.path;
  }
  const itemId = parseInt(body.itemId);

  db.Menu.update(
    { id: itemId },
    {
      $set: {
        ...body
      }
    }, function (err, data) {
      if (err) {
        res.json({
          success: false,
          message: err
        });
      } else {
        res.json({
          success: true,
          data: data
        });
      }
    })
};


module.exports = {
  addMenu: addMenu,
  getMenuList: getMenuList,
  getMenuItem: getMenuItem,
  updateMenuItem: updateMenuItem
}