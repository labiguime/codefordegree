const express = require('express');
const router = express.Router();
const course = require('../models/course.model.js');

/**
  * @route        GET api/courses
  * @description  Retrieve all the courses
  * @access       Public
  */

router.get('/', (req, res) => {
    res.status(200);
});

/**
  * @route        GET api/courses/:id
  * @description  Retrieve a specific course
  * @access       Public
  */

router.get('/:id', (req, res) => {
    res.status(200);
});

/**
  * @route        POST api/courses
  * @description  Create a new course
  * @access       Private
  */

router.post('/', (req, res) => {
    res.status(200);
});

/**
  * @route        DELETE api/courses/:id
  * @description  Delete a specific course
  * @access       Private
  */

router.delete('/:id', (req, res) => {
    res.status(200);
});

/**
  * @route        UPDATE api/courses/:id
  * @description  Update a specific course
  * @access       Private
  */

router.update('/:id', (req, res) => {
    res.status(200);
});
