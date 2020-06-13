var mongoose = require('mongoose');
var PostModel = mongoose.model('Posts');
var PostService = require('../services/post.service');

exports.postPost = async (req, res) => {

    let post = await PostService.postPost(req.body, req.user._id);

    res.send(post);

}

exports.getPost = async (req, res) => {


    let posts = await PostService.getPost();

    res.send(posts);
}

exports.getOnePost = async (req, res) => {

    let id = req.body.post;

    let post = await PostService.getOnePost(id);

    res.send(post);
}
exports.getOwnPost = async (req, res) => {


    let posts = await PostService.getOwnPost(req.user._id)
    res.send(posts);

}


exports.getFollowedPost = async (req, res) => {

    let user = req.user;

    let postMap = await PostService.getFollowedPost(user);

    res.send(postMap);

}


exports.setComment = async (req, res) => {
    try {
        let user = req.user.email;

        let comment = req.body.comment;

        let post = req.body.post;

        let result = await PostService.setComment(user, comment, post);

        res.send(result);
    }
    catch (error) {
        res.send(error)
    }

}
