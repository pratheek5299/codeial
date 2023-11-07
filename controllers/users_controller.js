const User = require('../models/user');
module.exports.profile = function(request,response){
    return response.render('user_profile',{
        title: 'User Profile'
    })
}

//render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    })
}

//render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    })
}


//get the sign up data
module.exports.create = function(request, response){
    if (request.body.password != request.body.confirm_password){
        return response.redirect('back');
    }
    // User.findOne({email: request.body.email}, function(err, user){
    //     if(err){
    //         console.log('error in finding the user in signing up');
    //         return;
    //     }

    //     if(!user){
    //         User.create(request.body, function(err, user){
    //             if(err){
    //                 console.log('error in creating the user in signing up');
    //                 return;
    //             } 
    //             return response.redirect('/users/sign-in');
    //         })
    //     }else{
    //         return response.redirect('back');
    //     }
    // })
    User.findOne({email: request.body.email}).then(function(user){
        if(!user){
            User.create(request.body).then(function(data){
                return response.redirect('/users/sign-in');
            })
        }else{
            return response.redirect('back');
        }
    })
}

//sign in and create as session for the user
module.exports.createSession = function(request, response){
    return response.redirect('/')
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err){
        if (err){
            return next(err);
        }
        return res.redirect('/')
    });// passport give the function
    
}