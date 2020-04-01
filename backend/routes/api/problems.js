const express = require('express');
const router = express.Router();
const problem = require('../../controllers/problem.controller');
const problemSubmission = require('./problem_submissions');
const testcase = require('./testcase');
const {verifyCourseAdminOrUser, verifyCourseAdmin} = require('../../middlewares/verifyEntity.middleware');
const auth = require("../../middlewares/auth");


/**
  * @route        GET api/courses/:courseId/problem
  * @description  Let a user retrieve all problems for a specific course
  * @access       Private
  */

router.get('/', verifyCourseAdminOrUser, problem.getProblems);

/**
  * @route        GET api/courses/:courseId/problem/:problemId
  * @description  Retrieve a specific problem
  * @access       Private
  */
router.get('/:problemId', auth, verifyCourseAdminOrUser, problem.getProblem);

/**
  * @route        POST api/courses/:courseId/problems
  * @description  Let the administrator of the course create a new problem
  * @access       Private
  */
router.post('/', auth, verifyCourseAdmin, problem.createProblem);

/**
  * @route        DELETE api/courses/:courseId/problems/:problemId
  * @description  Let the administrator of the course delete a problem
  * @access       Private
  */
router.delete('/:problemId', verifyCourseAdmin, problem.deleteProblem);

/**
  * @route        UPDATE api/courses/:courseId/problems/:problemId
  * @description  Let the administrator of the course update a problem
  * @access       Private
  */
router.put('/:problemId',verifyCourseAdmin, problem.updateProblem);

/**
 * Problem submission routes
 */
router.use('/:problemId/submissions', (req, res, next) => {
  res.locals.problemId = req.params.problemId;
  next();
},problemSubmission);

router.use('/:problemId/testcases', (req, res, next) => {
  res.locals.problemId = req.params.problemId;
  next()
},testcase);

module.exports = router;
