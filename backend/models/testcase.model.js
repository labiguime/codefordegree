const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testcaseSchema = new Schema({
    stdin: {
        type: String,
        required: true
    },
    expected_output: {
        type: String,
        required: true
    },
    problem_id:{
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    }

});


module.exports = mongoose.model("Testcase", testcaseSchema);