var db = require('../models'),
    CONSTANTS = require('../constants');

var addMenu = (req, res) => {
    let body = req.body;
    body.imageURL = req.file.path;
    var menuMenu = db.Menu(body).save(function (err, data) {
      if (err) {
        res.status(CONSTANTS.serCode.ISE).json({
          success: false,
          message: err
        });
        // throw errrs
      } else {
        res.status(CONSTANTS.serCode.success).json({
          success: true,
          data: data
        });
      }
    });
}

var getMenuList = (req, res) => {
      db.Menu.find({}, function (err, data) {
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

module.exports = {
    addMenu: addMenu,
    getMenuList: getMenuList
}