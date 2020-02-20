var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: { type: String },
    content: { type: String },
    date: { type: Date },
    creator_id: { type: String },
    rating: { type: Number, default: 0 },
    comments: [{
        comment: { type: String },
        user_email: { type: String }
    }]
});

const Post = mongoose.model('Posts', postSchema)

module.exports = Post;