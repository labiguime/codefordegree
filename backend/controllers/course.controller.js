'use-strict'

var Course = require("../models/course.model");

module.exports = {
    getCourseInfo: (req, res, next) => {
        let {courseId} = req.params;
        Course.findById(courseId, (err, course) => {
            if(err){
                console.log(err);
                return res.status(404).json({
                    error: ["Course not found", err]
                })
            }
            return res.status(200).json(course);
        });
    },

    createCourse: (req, res, next) => {
        let {name, description, term} = req.body;
        let {userId} = req.locals;
        Course.findOne({admin_id: userId, name: name, term: term}, (err, existedCourse) => {
            if(!err && !existedCourse){
                return res.status(500).json({
                    error: ["Same course is already existed", err]
                })
            }else{
                let newCourse = new Course({
                    name,
                    description,
                    term,
                    admin_id: userId
                })
                newCourse.save(err => {
                    if(err){
                        return res.status(500).json({
                            error: ["Course cannot be created", err]
                        })
                    }
                    return res.status(200).json(newCourse);
                })
            }
        });
    },

    updateCourseInfo: (req, res, next) => {
        let {courseId, name, description, term} = req.body;
        Course.updateOne({_id: courseId}, {name, description, term}, function(err, course){
            if(err){
                console.log(err);
                return res.status(500).json({
                    error: [err]
                })
            }
            return res.status(200).json(course);
        });
    }



}