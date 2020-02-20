var PostRatingModel = require('../models/postRating.model')
var PostModel = require('../models/post.model')

exports.postRating = async (post, user, rating) => {

    try {
        var postToR = await PostModel.findOne({ _id: post });
        var total = await PostRatingModel.countDocuments({ post_id: post });

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

        let calc = await PostRatingModel.find({ post_id: post });
        let rate = 0;

        calc.forEach((x) => {
            rate = parseFloat(rate) + parseFloat(x.rating);
        })
        let asd = parseFloat(rate / calc.length).toFixed(2);
        postToR.rating = asd


        await postToR.save();

        return rat;


    }
    catch (error) {
        return Error(error.message);
    }
}


exports.getRating = async () => {

    var result = await PostRatingModel.find({});

    return result;
}