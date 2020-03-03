const mongoose = require("mongoose")
const Schema = mongoose.Schema;

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
    language_id: {
        type: Schema.Types.ObjectId,
        ref: 'Language'
    },
    judge_submisson_ids: [
        {
            type: Schema.Types.ObjectId,
            ref: 'JudgeSubmission'
        }
    ]

});

module.exports = mongoose.model('ProblemSubmission', problemSubmissionSchema);
