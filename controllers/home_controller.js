const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(request, response){
    // console.log(request.cookies);
    // response.cookie('user_id', 25);

    // Post.find({}).then(function(allPosts){
    //     return response.render('home',{
    //         title: 'Codeial | Home',
    //         all_posts: allPosts
    //     });
    // })
    try{
        let allPosts = await Post.find({})
        .sort('-createdAt')
        .populate('user')//ref to models/posts.js in the schema user
        .populate({
            path: 'comments',//ref to models/posts.js in the schema comments
            populate: {
                path: 'user'
            }
        })
        let users = await User.find({});
    
        return response.render('home',{
            title: 'Codeial | Home',
            all_posts: allPosts,
            all_users: users
        });
    }catch(err){
        console.log('Error', err);
    }

}
//module.exports.action_name = function(request, response){}