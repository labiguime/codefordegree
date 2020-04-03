const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/user.model");

let userController = {};

userController.createUser = async function (req, res) {
  //Validate user input
  const { error } = validate(req.body);
  if (error) 
    return res.status(400).json({error: error.details[0].message});

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({error: "User already registered"});

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    //Generate a web token and send it to the client with user information
    const token = user.generateAuthToken();
    return res
      .status(201)
      .header("x-auth-token", token)
      .json(_.pick(user, ["_id", "name", "email"]));
  } catch (err) {
    return res.status(400).json({error: err.message});
  }
};

//TODO: Use JSON token issue time in the future to improve security(iat)
userController.getCurrentUser = async function(req, res) {
  try {
    const user = await User.findById(req.user_id).select("-password -__v");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({error: err.message});
  }
};
//TODO:
userController.updateProfile = async function(req, res) {
  let {name, email, studentNumber} = req.body;
  // let updatedProfile = {name, email, studentNumber};
  let updatedProfile = {};
  // const {userId} = req.params;
  if(name) updatedProfile.name = name;
  if(email) updatedProfile.email = email;
  if(studentNumber) updatedProfile.studentNumber = studentNumber;

try {
  const updatedProfile = await User.updateOne({_id: req.user_id}, 
                updatedProfile,
                {runValidators: true});
  if (!updatedProfile) {
    throw Error('Cannot update user profile.');
  }
  res.status(200).json({updatedProfile});   
  
} catch (err) {
  return res.status(400).json({error: err.message});
}
};

module.exports = userController;
