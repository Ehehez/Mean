var PostRatingModel = require('../models/postRating.model')
var PostModel = require('../models/post.model')

exports.postRating = async (post, user, rating) => {

    try {
        var postToR = await PostModel.findOne({ _id: post });
        //var total = await PostRatingModel.countDocuments({ post_id: post });

        var rat;
        let placeholder = await PostRatingModel.findOne({ post_id: post, user_id: user });
        if (placeholder != null) {
            rat = placeholder;
        } else {
            rat = new PostRatingModel();

        }
        rat.post_id = post;
        rat.user_id = user;
        rat.rating = rating;


        await rat.save();


        if (!postToR.rating.includes(rat._id)) {
            postToR.rating.push(rat._id);
        }



        await postToR.save();
        await postToR.populate('rating').execPopulate();
        return postToR;


    }
    catch (error) {
        return Error(error.message);
    }
}


exports.getRating = async () => {

    var result = await PostRatingModel.find({});

    return result;
}