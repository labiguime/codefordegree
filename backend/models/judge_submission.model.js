const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    id: Number,
    description: String
})

const judgeSubmissionSchema = new Schema({
    token: String,
    memory: Number, //In kilobytes
    time: Number, //In seconds
    status: {
        type: statusSchema,
        required: true
    },
    testcase_id: {
        type: Schema.Types.ObjectId,
        ref: 'Testcase',
        required: true
    }
});


module.exports = mongoose.model('Judge_Submission', judgeSubmissionSchema);