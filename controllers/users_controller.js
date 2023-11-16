const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(request,response){
    User.findById(request.params.id).then(function(user){
        return response.render('user_profile',{
            title: 'User Profile',
            profile_user:  user
        });
    });

}

module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body).then(function(user){
    //         req.flash('success', 'Updated')
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('******** Multer Error', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // this is saving the path of the file uploaded file into the avatar field in the user 
                    user.avatar = User.avatarPath +  '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }catch(err){
            req.flash('error', err);
            return res.redirect('back');   
        }

    }else{
        req.flash('error', 'Unauthorized')
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