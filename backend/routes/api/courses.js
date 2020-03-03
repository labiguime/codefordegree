'use-strict'
const express = require('express');
const router = express.Router();
const Course = require('../../models/course.model');
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

router.delete('/:courseId', deleteCourse); 

/**
  * @route        UPDATE api/courses/:id
  * @description  Update a specific course
  * @access       Private
  */

router.put('/:courseId', updateCourse);

module.exports = router;
