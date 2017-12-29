// import { setTimeout } from 'timers';
// import { setTimeout } from 'timers';
var mongoose = require('mongoose');

const CONSTANT = require('../../constants');


let orderSchema = new mongoose.Schema({
    id:{type: Number, default:1},
    orderBy: {type:String, required: true},
    items: {type: [
            {id:{type:Number},
            qnty:{type:Number}}], required:true},
    status: { type: String, default: CONSTANT.restro.orderStatus.PENDING },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date},
    updatedAt: { type: Date, default: Date.now}
});

var Order = mongoose.model('order', orderSchema);

orderSchema.pre('save', function(next) {
    var doc = this;
    Order.find({}).select('id').sort({id: -1}).limit(1).exec(function(err, data){
        if(data.length){
            doc.id = ++data[0].id;            
        }  
        doc.createdAt = Date.now();
        next();
    });
});


module.exports = Order;