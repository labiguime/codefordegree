const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");

/**
 * @route        GET api/auth
 * @description  Log in the user
 * @access       Public
 * @return       JSON object, x-auth-token
 */

router.post("/", authController.login);

module.exports = router;
