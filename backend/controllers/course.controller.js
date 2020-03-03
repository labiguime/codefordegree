'use-strict'

const Course = require("../models/course.model");

module.exports = {
    getCourse: (req, res, next) => {
        let {courseId} = req.params;
        Course.findById(courseId, (err, course) => {
            if(err || !course){
                console.log(err);
                return res.status(404).json({
                    error: ["Course not found", err]
                })
            }
            Course.populate(course, {path: 'admin_id'}, (err, populatedCourse) => {
                if(err){
                    return res.status(400).json({
                        error: ["Cannot get information of admin for course"]
                    })
                }
                return res.status(200).json(populatedCourse);
            });
        });
    },

    getCourses: async (req, res, next) => {
        let {userId} = req.params;
        let coursesByUser = await Course.find({admin_id: userId});
        return res.status(200).json(coursesByUser);
    },

    createCourse: (req, res, next) => {
        let {name, description, term} = req.body;
        let {userId} = res.locals;
        //TODO: Check if userId equals to the authenticated user 
        let newCourse = new Course({
            name,
            description,
            term,
            admin_id: userId
        });

        newCourse.save(err => {
            if(err){
               return res.status(400).json({
                   error: ["Cannot create course", err]
                });
            }
            return res.status(200).json(newCourse);
        });
    },

    updateCourse: async (req, res, next) => {
        let {name, description, term} = req.body;
        let {courseId} = req.params;
        let {userId} = res.locals;
        Course.findById(courseId, (err, courseTobeUpdated) => {
            if(err || !courseTobeUpdated){
                return res.status(400).json({
                    error: ["Course not found"]
                })
            }
            //Check if userId equals the authenticated user
            if(courseTobeUpdated.admin_id != userId){
                return res.status(400).json({
                    error: ["Course can only modified by admin"]
                })
            }
            Course.updateOne({_id: courseId}, {name, description, term}, 
                {runValidators: true},
                (err, course) => {
                    if(err){
                        console.log(err);
                        return res.status(400).json({
                            error: ["Course cannot be updated", err]
                        })
                    }
                    return res.status(200).json(course);
            });
        })
        
    },

    deleteCourse: async (req, res, next) => {
        let {courseId} = req.params;
        let {userId} = res.locals;
        Course.findById(courseId, (err, courseTobeDeleted) => {
            if(err || !courseTobeDeleted){
                return res.status(400).json({
                    error: ["Course not found"]
                })
            }
            //TODO: Check if userId equals the authenticated user
            if(courseTobeDeleted.admin_id != userId){
                return res.status(400).json({
                    error: ["Course can only deleted by admin"]
                })
            }
            Course.deleteOne({_id: courseId}, err => {
                if(err){
                    return res.status(400).json({
                        error: ["Course cannot be deleted"]
                    })
                }
                return res.status(200).json({})
            });
        });
        
    }
}