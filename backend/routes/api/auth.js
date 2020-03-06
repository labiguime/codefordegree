const express = require('express');
const router = express.Router();
const authController = require("../../controllers/auth.controller");

/**
  * @route        GET api/auth
  * @description  Log in the user
  * @access       Public
  */

router.post('/', authController.login);

module.exports = router;