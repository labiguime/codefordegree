const auth = require("../../middlewares/auth");
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const {getProblemSubmissionStat} = require("../../controllers/statistic.controller");
/**
 * @route        POST api/user
 * @description  Create a New User
 * @access       Public
 * @return       JSON object, x-auth-token
 */
router.post("/", userController.createUser);


/**
 * @route        GET api/user/me
 * @description  Retrive user Information
 * @access       Private, requires log in
 * @return       JSON object
 */
router.get("/me", auth, userController.getCurrentUser);

/**
 * @route        UPDATE api/user/me
 * @description  UPDATE user Information
 * @access       Private, requires log in
 */
router.put("/:me", auth, userController.updateProfile);

router.get("/statistic", auth, getProblemSubmissionStat);

module.exports = router;