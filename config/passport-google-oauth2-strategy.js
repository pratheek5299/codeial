const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for user login    
passport.use(new googleStrategy({
        clientID: '456947781353-nuog80m2kdk5tqks38irvbvljjqqpes9.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8000/users/auth/google/callback',
    },

    function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec().then(function( user){
            console.log(profile);
            if (user){
                //if the user is found set this user a req.user
                return done(null, user);
            }else{
                //if the user is not found create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                }).then(function(user){
                    return done(null, user);
                }).catch(function(err){
                    if(err){console.log('Error in google strategy-passport', err); return;}
                })
            }
        }).catch(function(err){
            if(err){console.log('Error in google strategy-passport', err); return;}
        })
    }
))

module.exports = passport;