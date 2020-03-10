'use-strict'
const express = require('express');
const router = express.Router();
const Course = require('../../models/course.model');
const problemRoute = require("./problems");
const {verifyCourseAdmin, verifyCourseAdminOrUser} = require("../../middlewares/verifyEntity.middleware");
const {getCourse, getCourses, 
      createCourse, updateCourse, deleteCourse} = require("../../controllers").course;
/**
  * @route        GET api/courses
  * @description  Retrieve all the courses
  * @access       Public
  */

router.get('/', getCourses);

/**
  * @route        GET api/courses/:id
  * @description  Retrieve a specific course
  * @access       Public
  */

router.get('/:courseId', getCourse);

/**
  * @route        POST api/courses
  * @description  Create a new course
  * @access       Private
  */

router.post('/', createCourse);

/**
  * @route        DELETE api/courses/:id
  * @description  Delete a specific course
  * @access       Private
  */

router.delete('/:courseId', verifyCourseAdmin, deleteCourse); 

/**
  * @route        UPDATE api/courses/:id
  * @description  Update a specific course
  * @access       Private
  */

router.put('/:courseId', verifyCourseAdmin, updateCourse);

/**
 * Problem routes
 */
router.use('/:courseId/problems', (req, res, next) => {
  res.locals.courseId = req.params.courseId;
},problemRoute);

module.exports = router;
