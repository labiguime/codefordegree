const _ = require('lodash');
const Joi = require('Joi');
const bcrypt = require('bcryptjs');
const {User} = require('../models/user.model');

let authController = {};

authController.login = async function getCourse(req, res) {
    //Validate User Input using Joi
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid Email or Password');

    const validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Email or Password');
    
    //Generate Json Web Token
    const token = user.generateAuthToken();
    res.send(token);
}


function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(req, schema);
}

module.exports = authController;