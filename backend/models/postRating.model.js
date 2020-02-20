var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postRatingSchema = new Schema({
    post_id: { type: String },
    user_id: { type: String },
    rating: { type: Number },

});

postRatingSchema.index({ post_id: 1, user_id: 1 }, { unique: true })

const PostRating = mongoose.model('PostRating', postRatingSchema)

module.exports = PostRating;