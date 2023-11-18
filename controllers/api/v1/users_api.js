const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(request, response){
    try{
        let user = await User.findOne({email: request.body.email});
        if (!user || user.password != request.body.password){
            return response.status(422).json({
                message: "Invalid Username or Password"
            })
        }
        return response.status(200).json({
            message: "Sign in successful, here is your token, please keep it safe",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: 100000})// 100000 is in milliseconds
            }
        })
    }catch(err){
        console.log('*********',err);
        return response.status(500).json({
            message: 'Internal Server Error!!',
        })
    }
}