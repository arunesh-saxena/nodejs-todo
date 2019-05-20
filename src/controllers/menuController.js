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

var getMenuItem = async (req, res) => {
  const itemId = req.params.itemID;
  try {
    const item = await getMenuItemById(itemId);
    res.json({
      success: true,
      data: item
    });
  } catch (err) {
    res.json({
      success: false,
      data: err
    });
  }
};

let getMenuItemById = async (itemId) => {
  return await db.Menu.findOne({ id: itemId }).exec();
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
    },
    { upsert: true }, async function (err, data) {
      if (err) {
        res.json({
          success: false,
          message: err
        });
      } else {
        try {
          const item = await getMenuItemById(itemId);
          res.json({
            success: true,
            data: item
          });
        } catch (err) {
          res.json({
            success: false,
            data: err
          });
        }
      }
    })
};


module.exports = {
  addMenu: addMenu,
  getMenuList: getMenuList,
  getMenuItem: getMenuItem,
  updateMenuItem: updateMenuItem
}