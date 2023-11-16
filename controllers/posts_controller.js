const Post = require('../models/post');
const Comments = require('../models/comment');
const { deleteMany } = require('../models/user');

module.exports.create = function(request, response){
    Post.create({
        content: request.body.content,
        user: request.user._id
    }).then(function(data){
        if(request.xhr){
            return response.status(200).json({
                data: {
                    post: data
                },
                message: "Post Created"
            });
        }
        request.flash('success', 'Post Created');
        return response.redirect('back');
    }).catch(function(err){
        console.log('Error in creating a post', err);
    })
};

module.exports.destroy = function(req, res){
    Post.findById(req.params.id).then(function(post){
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.deleteOne();

            Comments.deleteMany({post: req.params.id}).then(function(){
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post_id: req.params.id,
                        },
                        message: 'Post deleted',
                    })
                }
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
}