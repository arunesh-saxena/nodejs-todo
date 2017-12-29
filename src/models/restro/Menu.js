var mongoose = require('mongoose');

let menuSchema = new mongoose.Schema({
    id:{type: Number},
    itemName:{type: String},
    description:{type: String},
    imageURL:{type: String},
    price: {type: Number},
    unit: {type: String},
    currency: {type: String}
});

var Menu = mongoose.model('menu', menuSchema);

module.exports = Menu;