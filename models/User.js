var mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        dropDups: true,
        required: true,
        index: true,
        minlength: [5, 'Username must be 5 characters or more']
    },
    email: {
        type: String,
        unique: true,
        dropDups: true,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Username must be 9 characters or more']
    },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

var User = mongoose.model('users', userSchema);

module.exports = User;