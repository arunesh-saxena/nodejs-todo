
var mongoose = require('mongoose');

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    id: {type: Number, default: 1 },
    isCompleted: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    name: String,
    createdAt: { type: Date, default: Date.now },
});

var Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;