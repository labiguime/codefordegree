const express = require('express');
const router = express.Router();
const {getProblemSubmission, 
      getProblemSubmissions,
      createProblemSubmission} = require('../../controllers/problem_submission.controller');
const {verifyProblem, verifyCourseAdminOrUser} = require("../../middlewares/verifyEntity.middleware");

router.use(verifyCourseAdminOrUser);

router.use(verifyProblem);

/**
  * @route        GET api/user/:userId/course/:courseId/problem/:problemId/submissions
  * @description  Let a participant of the course retrieve all his/her submissions for a specific problem
  * @access       Private
  */
router.get('/', getProblemSubmissions);

/**
  * @route        GET api/user/:userId/course/:courseId/problem/:problemId/submissions/:submissionId
  * @description  Retrieve a specific submission of a specific problem 
  * @access       Private
  */
router.get('/:submissionId', getProblemSubmission);

/**
  * @route        POST api/user/:userId/course/:courseId/problem/:problemId/submissions
  * @description  Let the participant of the course create a new problem submission
  * @access       Private
  */
router.post('/', createProblemSubmission);

module.exports = router;
