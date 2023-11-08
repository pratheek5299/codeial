const Post = require('../models/post');

module.exports.home = function(request, response){
    // console.log(request.cookies);
    // response.cookie('user_id', 25);

    // Post.find({}).then(function(allPosts){
    //     return response.render('home',{
    //         title: 'Codeial | Home',
    //         all_posts: allPosts
    //     });
    // })

    Post.find({}).populate('user').exec().then(function(allPosts){
        return response.render('home',{
            title: 'Codeial | Home',
            all_posts: allPosts
        });
    });

}
//module.exports.action_name = function(request, response){}