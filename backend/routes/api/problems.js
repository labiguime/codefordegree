const express = require('express');
const router = express.Router();

/**
  * @route        GET api/user/:userId/course/:courseId/problem
  * @description  Let a user retrieve all problems for a specific course
  * @access       Private
  */

router.get('/', () => {});

/**
  * @route        GET api/user/:userId/course/:courseId/problem/:problemId
  * @description  Retrieve a specific problem
  * @access       Private
  */

router.get('/:problemId', () => {});

/**
  * @route        POST api/user/:userId/course/:courseId/problem
  * @description  Let the administrator of the course create a new problem
  * @access       Private
  */

router.post('/', () => {});

/**
  * @route        DELETE api/user/:userId/course/:courseId/problem/:problemId
  * @description  Let the administrator of the course delete a problem
  * @access       Private
  */

router.delete('/:problemId', () => {});

/**
  * @route        UPDATE api/user/:userId/course/:courseId/problem/:problemId
  * @description  Let the administrator of the course update a problem
  * @access       Private
  */

router.put('/:problemId', () => {});

module.exports = router;
