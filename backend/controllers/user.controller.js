const _ = require('lodash');
const {User, validate} = require('../models/user.model');

let userController = {};

userController.createUser = async function getCourse(req, res) {
    //Validate User Input using Joi
    // const {error} = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body,['name', 'email', 'password']));

    try {
    await user.save();
    } catch (err) {
        error = []
        for (field in err.errors) {
            error.push(err.errors[field].message)
        }
        res.send(error)
    }

    res.send(
        _.pick(user, ['_id', 'name', 'email'])
    );
}

module.exports = userController;