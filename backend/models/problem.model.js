const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
	name: {
		type: String,
		required: [true, 'A problem must be named']
	},
	description: String,
	mark: {
		type: Number,
		min: 0,
		required: [true, 'Total amount of marks that can be earned must be specified for this problem.']
	},
	runtime_limit: Number,
	deadline: Date,
	course_id: {
		type: Schema.Types.ObjectId,
		ref: 'Course',
		required: [false, 'A problem must be linked to a course']
	},
	test_ids: {
		type: Schema.Types.ObjectId,
		ref: 'Testcase'
	}
});

problemSchema.index({name: 1, course_id: 1}, {unique: true});
module.exports = mongoose.model('Problem', problemSchema);
