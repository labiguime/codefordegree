
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const {User, validate} = require('../models/user.model');

let userController = {};

userController.createUser = async function getCourse(req, res) {
    //Validate User Input using Joi
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered');

    
    user = new User(_.pick(req.body,['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    try {
    await user.save();
    } catch (err) {
        error = []
        for (field in err.errors) {
            error.push(err.errors[field].message)
        }
        res.send(error)
    }

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'password']));
}

userController.getCurrentUser = async function (req,res) {
    const user = await User.findById(req.user_id).select('-password -__v');
    res.send(user);
}

module.exports = userController;