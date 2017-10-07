var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let commentSchema = new Schema({
    text: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    _creator: { type: Schema.ObjectId, ref: 'users' },
    _post: { type: Schema.ObjectId, ref: 'posts' }
});

 let autoPopulateCreator = function (next) {
    this.populate({
        path: '_creator',
        select: 'username createdAt'
    });
    next();
}
commentSchema.pre('find', autoPopulateCreator); 

var Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;