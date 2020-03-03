var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var courseSchema = new Schema({
    name: {
        type: String,
        required: [true, "A course needs a name"]
    },
    description: String,
    term: {
        type: String,
        enum: ["spring", "summer", "fall"],
        required: [true, "Term is needed to distinguish courses and must be either Spring, Summer or Fall"]
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Course need to be administrated by an user"]
    },
    problem_ids: [{
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    user_ids: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

courseSchema.index({name: 1, admin_id: 1, term: 1}, {unique: true});
module.exports = mongoose.model('Course', courseSchema);;
