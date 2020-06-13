var PostModel = require("../models/post.model")
var UserModel = require('../models/user.model')
exports.postPost = async (body, id) => {
    try {
        const post = new PostModel(body)
        post.creator_id = id;
        await post.save()
        return post;
    } catch (error) {
        throw Error(error.message);
    }
}

exports.getPost = async () => {
    try {
        let ret = await PostModel.find({}, function (err, posts) {
            var postMap = [];

            posts.forEach(function (post) {
                postMap.push(post);
            });

            return postMap;
        }
        )
        return ret;
    }
    catch (error) {
        throw Error(error.message)
    }
}

exports.getOnePost = async (id) => {
    try {
        let ret = await (await PostModel.findOne({ _id: id })).populate('rating').execPopulate();
        return ret;
    }
    catch (error) {
        throw Error(error.message)
    }
}

exports.getOwnPost = async (id) => {

    try {
        let a = await PostModel.find({ creator_id: id }, function (err, posts) {

            return (posts);
        })
        return a;
    }
    catch (error) {
        return (error.message);
    }
}


exports.getFollowedPost = async (user) => {
    try {

        var postMap = [];
        let a = await PostModel.find({}, function (err, posts) {

            posts.forEach(function (post) {
                user.follows.forEach((x) => {

                    if (post.creator_id == x._id) {
                        postMap.push(post);
                    }
                })

            })
            return postMap;
        })
        return postMap;
    }
    catch (error) {
        return (error.message);
    }
}

exports.setComment = async (user, comentario, post) => {
    try {

        let postt = await PostModel.findOne({ _id: post });
        postt.comments.push({ user_email: user, comment: comentario });

        await postt.save();

        return postt;
    }
    catch (e) {
        return e.message;
    }
}


