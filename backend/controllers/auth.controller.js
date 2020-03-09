const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user.model");

let authController = {};

authController.login = async function(req, res) {
  //Validate user input
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("Invalid Email or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json("Invalid Email or Password");

  //Generate Json Web Token and send it to the client with user information
  const token = user.generateAuthToken();
  return res
    .status(200)
    .header("x-auth-token", token)
    .json(_.pick(user, ["_id", "name", "email"]));
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(50)
      .required()
  };
  return Joi.validate(req, schema);
}

module.exports = authController;
