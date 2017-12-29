
var mongoose = require('mongoose');

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    id: Number,
    isCompleted: Boolean,
    isDeleted: Boolean,
    name: String
});

var Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;