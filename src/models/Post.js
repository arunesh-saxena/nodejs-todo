var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let postSchema = new Schema({
    title: { type: String, required: true },
    link: String,
    text: String,
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    _creator: { type: Schema.ObjectId, ref: 'users' },
    _comments: [{ type: Schema.ObjectId, ref: 'comments' }]
});

var Post = mongoose.model('posts', postSchema);

module.exports = Post;