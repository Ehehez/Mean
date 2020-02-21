var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postRatingSchema = new Schema({
    post_id: { type: Schema.Types.ObjectId },
    user_id: { type: Schema.Types.ObjectId },
    rating: { type: Number },

});

postRatingSchema.index({ post_id: 1, user_id: 1 }, { unique: true })

const PostRating = mongoose.model('PostRating', postRatingSchema)

module.exports = PostRating;