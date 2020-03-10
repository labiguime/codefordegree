const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const languageSchema = new Schema({
    id: Number,
    name: String
});

const problemSubmissionSchema = new Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    result: {
        type: Number,
        min: 0,
        max: 1
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    problem_id: {
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    },
    source_code: {
        type: String,
        required: true
    },
    language: {
        type: languageSchema,
        required: true
    },
    //Ids of each small submission for a specific test case
    judge_submisson_ids: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Judge_Submission'
        }
    ],
    testcase_results: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Testcase'
        },
        result: Boolean, //Passed(True) or Failed(False)
    }]

});

module.exports = mongoose.model('Problem_Submission', problemSubmissionSchema);
