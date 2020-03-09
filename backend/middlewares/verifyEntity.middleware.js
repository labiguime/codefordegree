const Problem = require("../models/problem.model");
const Course = require("../models/course.model");

module.exports = {
    verifyCourseAdmin: async (req, res, next) => {
        const courseId = res.params.courseId || res.locals.courseId;
        const user_id = req.user_id;
        try{
            const course = await Course.findById(courseId);
            if(!course)
                return res.status(404).json({
                    error: "Course not found with given course id in request parameter"
                });
            if(course.admin_id != user_id)
                return res.status(400).json({
                    error: "Request for this action must be from admin of the course"
                });
            next();

        }catch(e){
            console.log(e);
            return res.status(500).json({error: "Internal server error"});
        }
    },
    verifyCourseAdminOrUser: async (req, res, next) => {
        const courseId = res.params.courseId || res.locals.courseId;
        const user_id = req.user_id;
        try{
            const course = await Course.findById(courseId);
            if(!course)
                return res.status(404).json({
                    error: "Course not found with given course id in request parameter"
                });
            if(course.admin_id != user_id && !course.user_ids.includes(user_id))
                return res.status(400).json({
                    error: "Request for this action must be from admin or student of the course"
                });
            next();
        }catch(e){
            console.log(e);
            return res.status(500).json({error: "Internal server error"});
        }
        

    },
    verifyProblem: async (req, res, next) => {
        const {problemId, courseId} = res.locals;
        try{
            const problem = await Problem.findById(problemId);
            if(!problem)
                return res.status(404).json({
                    error: "Problem not found with given problem id in requested parameter"
                });
            if(problem.course_id != courseId)
                return res.status(404).json({
                    error: "Problem does not exist in the course found by given course id in requested paramter"
                })
            next();

        }catch(e){
            console.log(e);
            return res.status(500).json({error: "Internal server error"});
        }
    }
}