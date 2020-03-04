const Problem = require('/../models/problem.model');

let problemController = {};

problemController.getProblem = async function (req, res) {
	try {
		const {problemId} = req.params;
		const problem = await Problem.findById(problemId);
		if (!problem) throw Error(`This problem doesn't exist`);
		// We don't need to populate 'course_id' because the course is already known
		res.status(200).json(problem);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

problem.getProblems = async function(res, req) {
	try {
		const problems = await Problem.find();
		if (!problems) throw Error('No problems found');
		res.status(200).json(problems);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};


module.exports = problemController;
