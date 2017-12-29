var mongoose = require('mongoose');

let menuSchema = new mongoose.Schema({
    id:{type: Number,default:1},
    itemCode:{type: String, default:null},
    itemName:{type: String},
    description:{type: String},
    imageURL:{type: String},
    price: {type: Number},
    unit: {type: String},
    currency: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

var Menu = mongoose.model('menu', menuSchema);

menuSchema.pre('save', function(next) {
    var doc = this;
    console.log(doc);
    Menu.find({}).select('id').sort({id: -1}).limit(1).exec(function(err, data){
        if(data.length){
            doc.id = data[0].id++;
            doc.itemCode = `${doc.itemName.substr(0,3)}${doc.id}`;
        }else{
            doc.itemCode = `${doc.itemName.substr(0,3)}${doc.id}`;
        }        
        next();
    });
});

module.exports = Menu;