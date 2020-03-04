const express = require('express');
const router = express.Router();
const problem = require('../../controllers/problem.controller');
/**
  * @route        GET api/user/:userId/course/:courseId/problem
  * @description  Let a user retrieve all problems for a specific course
  * @access       Private
  */

router.get('/', problem.getProblems);

/**
  * @route        GET api/user/:userId/course/:courseId/problem/:problemId
  * @description  Retrieve a specific problem
  * @access       Private
  */

router.get('/:problemId', problem.getProblem);

/**
  * @route        POST api/user/:userId/course/:courseId/problem
  * @description  Let the administrator of the course create a new problem
  * @access       Private
  */

router.post('/', problem.createProblem);

/**
  * @route        DELETE api/user/:userId/course/:courseId/problem/:problemId
  * @description  Let the administrator of the course delete a problem
  * @access       Private
  */

router.delete('/:problemId', problem.deleteCourse);

/**
  * @route        UPDATE api/user/:userId/course/:courseId/problem/:problemId
  * @description  Let the administrator of the course update a problem
  * @access       Private
  */

router.put('/:problemId', problem.updateCourse);

module.exports = router;
