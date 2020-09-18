'use-strict'
const express = require('express');
const router = express.Router();
const Course = require('../../models/course.model');
const problemRoute = require("./problems");
const {verifyCourseAdmin, verifyCourseAdminOrUser} = require("../../middlewares/verifyEntity.middleware");
const courseController = require("../../controllers").course;
/**
  * @route        GET api/courses
  * @description  Retrieve all the courses for which the user is admin
  * @access       Public
  */
router.get('/', courseController.getCourses);


/**
  * @route        GET api/courses
  * @description  Retrieve all the courses that exist in the database
  * @access       Public
  */

router.get('/all', async (req, res, next) => {
    try{
        let allCourses = await Course.find();
        return res.status(200).json(allCourses);
    }catch(e){
        console.log(e);
        return res.status(500).json({error: "Internal server error"});
    }
});

/**
  * @route        GET api/courses
  * @description  Retrieve all the courses for which the user is enrolled
  * @access       Public
  */

router.get('/enrolled', async (req, res, next) => {
    let userId = req.user_id;
    try{
        let enrolledCourses = await Course.find({user_ids: userId});
        return res.status(200).json(enrolledCourses);
    }catch(e){
        console.log(e);
        return res.status(500).json({error: "Internal server error"});
    }
});

/**
  * @route        GET api/courses/:id
  * @description  Retrieve a specific course
  * @access       Public
  */

router.get('/:courseId', courseController.getCourse);

/**
  * @route        POST api/courses
  * @description  Create a new course
  * @access       Private
  */

router.post('/', courseController.createCourse);

/**
  * @route        POST api/courses
  * @description  Create a new course
  * @access       Private
  */

router.post('/join/:courseId', async (req, res, next) => {
    const {courseId} = req.params;
    const {userId} = req.body;
    try {
        let course = await Course.findOne({_id: courseId});
        if(!course) {
            console.log("This course no longer exists.");
            return res.status(400).json({error: "This course no longer exists."});
        }
        if(course.user_ids) {
            if(course.user_ids.includes(userId)) {
                console.log("You are already in this course.");
                return res.status(400).json({error: "You are already in this course."});
            }
        }
        course.user_ids.push(userId);
        const result = await course.save();
        if(!result) {
            return res.status(400).json({error: "The course has been deleted."});
        }
        return res.status(200).json();
    } catch(e) {
        return res.status(500).json({error: "Internal server error"});
    }
});

router.delete('/leave/:courseId',  verifyCourseAdminOrUser, async (req, res, next) => {
    const {courseId} = req.params;
    const {userId} = req.body;
    try {
        let course = await Course.findOne({_id: courseId});
        if(!course) {
            console.log("This course no longer exists.");
            return res.status(400).json({error: "This course no longer exists."});
        }
        course.user_ids.splice( course.user_ids.indexOf(userId), 1);
        const result = await course.save();
        if(!result) {
            return res.status(400).json({error: "The course has been deleted."});
        }
        return res.status(200).json();
    } catch(e) {
        return res.status(500).json({error: "Internal server error"});
    }
});

/**
  * @route        DELETE api/courses/:id
  * @description  Delete a specific course
  * @access       Private
  */

router.delete('/:courseId', verifyCourseAdmin, courseController.deleteCourse);

/**
  * @route        UPDATE api/courses/:id
  * @description  Update a specific course
  * @access       Private
  */

router.put('/:courseId', verifyCourseAdmin, courseController.updateCourse);

/**
 * Problem routes
 */
router.use('/:courseId/problems', (req, res, next) => {
  res.locals.courseId = req.params.courseId;
  next();
},problemRoute);

module.exports = router;
