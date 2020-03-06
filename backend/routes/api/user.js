'use-strict'

const express = require('express');
const router = express.Router();
const userController = require("../../controllers/user.controller");

/**
  * @route        GET api/users
  * @description  Retrieve all the users
  * @access       Public
  */

router.post('/', userController.createUser);

module.exports = router;
