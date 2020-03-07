const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/user.model");

let userController = {};

userController.createUser = async function (req, res) {
  //Validate User Input using Joi
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    await user.save();
  } catch (err) {
    error = [];
    for (field in err.errors) {
      error.push(err.errors[field].message);
    }
    return res.send(error);
  }

  //Generate a web token and send it to the client with user information
  const token = user.generateAuthToken();
  return res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
};

userController.getCurrentUser = async function(req, res) {
  const user = await User.findById(req.user_id).select("-password -__v");
  return res.send(user);
};

module.exports = userController;
