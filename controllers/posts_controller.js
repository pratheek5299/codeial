const Post = require('../models/post');

module.exports.create = function(request, response){
    Post.create({
        content: request.body.content,
        user: request.user._id
    }).then(function(data){
        return response.redirect('back');
    }).catch(function(err){
        console.log('Error in creating a post', err);
    })
}