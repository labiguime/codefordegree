const Joi = require('joi');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
});

userSchema.methods.generateAuthToken = function() {
    token = jwt.sign({ _id: this.id}, process.env.JWT_PRIVATE_KEY);
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        //we can use joi-password-complexity for password complexity check
        password: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;