const User = require('../models/user');
module.exports.profile = function(request,response){
    let userCookie = request.cookies.user_id;
    console.log(userCookie)
    if (userCookie){
        User.findById(userCookie).then(function(user){
            // send user data
            return response.render('user_profile',{
                title: 'User Profile',
                user_data: user
            })
        }).catch(function(err){
            if(err){
                console.log('Error in finding the user during signing in');
            }
        })     
    }else{
        return response.redirect('/users/sign-in')
    }
}

//render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    })
}

//render the sign in page
module.exports.signIn = function(req, res){
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
    //steps to authenticate the user
    //find the user
    User.findOne({email: request.body.email}).then(function(user){
        // handle user found
        if (user){
            // handle password which don't match 
            if (user.password != request.body.password){
                return response.redirect('back');
            }
            // handle session creation
            response.cookie('user_id', user._id);
            console.log(user.id)
            console.log(user._id);
            return response.redirect('/users/profile');
        }else{
            //handle user not found
            response.redirect('back');
        }
    }).catch(function(err){
        if(err){
            console.log('Error in finding the user during signing in');
            return;
        }
    })
  
}

module.exports.signOut = function(request, response){
    response.clearCookie('user_id');
    return response.redirect('back');
}