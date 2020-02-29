var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: String,
    description: String,
    term: {
        type: String,
        enum: ["Spring", "Summer", "Fall"],
        required: [true, "Term is needed to distinguish courses"]   
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Course need to be administrated by an user"]
    },
    problems_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

var Course = mongoose.Model('Course', courseSchema);
module.exports = Course;

