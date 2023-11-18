const Post = require('../../../models/post');
const Comments = require('../../../models/comment');
module.exports.index = async function(req, res){
    
    let allPosts = await Post.find({})
        .sort('-createdAt')
        .populate('user')//ref to models/posts.js in the schema user
        .populate({
            path: 'comments',//ref to models/posts.js in the schema comments
            populate: {
                path: 'user'
            }
        });

    return res.status(200).json({
        message: "List of posts",
        posts: allPosts
    })
}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id).then(function(post){
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.deleteOne();

            Comments.deleteMany({post: req.params.id}).then(function(){
                // if(req.xhr){
                //     return res.status(200).json({
                //         data:{
                //             post_id: req.params.id,
                //         },
                //         message: 'Post deleted',
                //     })
                // }
                // return res.redirect('back');
            });
            return res.status(200).json({
                message: 'Post and corresponding comments are deleted successfully'
            })
        }else{
            return res.status(401).json({
                message: 'You cannot delete this post!'
            })
        }
    })
}