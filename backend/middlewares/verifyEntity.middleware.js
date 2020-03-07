const Problem = require("../models/problem.model");
const Course = require("../models/course.model");

module.exports = {
    verifyUserId: (req, res, next) => {
        const {userId} = req.params;
        const user_id = req.user_id;
        if(user_id != userId)
            return res.status(400).json({
                error: "User id in request paramter does not match the authenticated user"
            });
        next();
    },
    verifyCourseAdmin: async (req, res, next) => {
        const {courseId} = res.locals;
        const user = req.user;
        const course = await Course.findById(courseId);
        if(!course)
            return res.status(404).json({
                error: "Course not found with given course id in request parameter"
            });
        if(course.admin_id != user._id)
            return res.status(400).json({
                error: "Authenticated user is not the admin of requested course"
            });
        next();
    },
    verifyCourseAdminOrUser: async (req, res, next) => {
        const {courseId} = res.locals;
        const user = req.user;
        const course = await Course.findById(courseId);
        if(!course)
            return res.status(404).json({
                error: "Course not found with given course id in request parameter"
            });
        if(course.admin_id != user._id || !course.user_ids.includes(user._id))
            return res.status(400).json({
                error: "Authenticated user is not in requested course"
            });
        next();

    },
    verifyProblem: async (req, res, next) => {
        const {problemId, courseId} = res.locals;
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
    }
}