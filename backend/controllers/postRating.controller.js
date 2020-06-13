var mongoose = require('mongoose');
var PostRatingModel = mongoose.model('PostRating');
var PostRatingService = require('../services/postRating.service');
var PostService = require('../services/post.service')

exports.postRating = async (req, res) => {

    let rating = await PostRatingService.postRating(req.body.post, req.user._id, req.body.rating);


    res.send(rating);

}

exports.getRating = async (req, res) => {

    let ratings = await PostRatingService.getRating();


    res.send(ratings);
}