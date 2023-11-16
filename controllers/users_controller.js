const User = require('../models/user');
module.exports.profile = function(request,response){
    User.findById(request.params.id).then(function(user){
        return response.render('user_profile',{
            title: 'User Profile',
            profile_user:  user
        });
    });

}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body).then(function(user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
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
    request.flash('success', 'Logged in successfully'); //(type, message)
    return response.redirect('/')
}

module.exports.destroySession = function(req, res, next){
    
    req.logout(function(err){
        if (err){
            return next(err);
        }
        req.flash('success', 'You have logged out'); //(type, message)
        return res.redirect('/')
    });// passport give the function
    
}