const auth = require("../../middleware/auth");
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");

/**
 * @route        POST /user
 * @description  Create a New User
 * @access       Public
 */

router.post("/", userController.createUser);

/**
 * @route        GET /user/me
 * @description  Retrive my infomration
 * @access       Private, need authentication token
 */

router.get("/me", auth, userController.getCurrentUser);

module.exports = router;
