const {getCourse, 
        createCourse, 
        updateCourse,
        deleteCourse,
        getCourses} = require("./course.controller");

module.exports = {
    course:{
        getCourse,
        createCourse,
        updateCourse,
        deleteCourse,
        getCourses
    }
};