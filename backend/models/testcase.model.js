const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testcaseSchema = new Schema({
    stdin: {
        type: String,
    },
    expected_output: {
        type: String,
        required: true
    },
    problem_id:{
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    },
    hidden: {
        type: Boolean,
        default: true 
    }

});


module.exports = mongoose.model("Testcase", testcaseSchema);