const auth = require('../../middleware/auth');
const express = require('express');
const router = express.Router();
const userController = require("../../controllers/user.controller");

/**
  * @route        GET /user/me
  * @description  Retrieve all the users
  * @access       Private, need authentication token
  */

 router.get('/me', auth, userController.getCurrentUser);


/**
  * @route        POST /user
  * @description  Retrieve all the users
  * @access       Public
  */
 
router.post('/', userController.createUser);



module.exports = router;
