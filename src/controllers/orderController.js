var db = require('../models'),
    CONSTANTS = require('../constants');

var addOrder = (req, res) => {
    const body = req.body;
    
    const order = db.Order(body).save(function (err, data) {
        sendRes(res, err, data);
      });
    
}
var updateOrder = (req, res) => {
    const body = req.body,
        orderId = req.params.id;
    const setObj = {
        status: body.status,
        updatedAt: Date.now()
    };
    const order = db.Order.update({
            id: orderId
        }, {
            $set: setObj
        }, function (err, data) {
            if (err) {
                sendRes(res, err, data);  
            } else {
                getOrderbyId(orderId, function(err,data){
                    sendRes(res, err, data[0]);
                })
                  
            }
        });
};

var getOrderbyId = (orderId, callback) => {
    db.Order.find({id:orderId},function(err, data){
        callback(err, data);
    });
}

var newOrder = (req, res, body) => {
    const order = db.Order(body).save(function (err, data) {
        sendRes(res, err, data);
      });
};

var getOrderList = (req, res) => {
    db.Order.find({},function(err, data){
        sendRes(res, err, data);
    });
}

var getOrder = (req, res) => {
    const orderId = req.params.id ;
    getOrderbyId(orderId, (err, data) => {
        sendRes(res, err, data[0]);
    });
};

const sendRes = (res, err, data) => {
    if (err) {
        res.status(CONSTANTS.serCode.ISE).json({
          success: false,
          data: err
        });
        // throw err;
      } else {
        res.status(CONSTANTS.serCode.success).json({
          success: true,
          data: data
        });
      }
}

module.exports = {
    addOrder: addOrder,
    updateOrder: updateOrder,
    getOrderList: getOrderList,
    getOrder: getOrder
}