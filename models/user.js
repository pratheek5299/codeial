const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        requried: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;