var db = require('../models'),
    CONSTANTS = require('../constants');

var addMenu = (req, res) => {
    let body = req.body;
    if(req.file && req.file.path){
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

module.exports = {
    addMenu: addMenu,
    getMenuList: getMenuList
}