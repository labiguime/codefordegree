const Problem = require('../models/problem.model');

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

problemController.getProblems = async function(req, res) {
	try {
		const problems = await Problem.find();
		if (!problems) throw Error('No problems found');
		res.status(200).json(problems);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

problemController.createProblem = async function(req, res) {
	const newProblem = new Problem({
		name: 'Easy problem',
		description: 'Cannot describe',
		mark: 30,
		runtime_limit: 0,
		deadline: Date.now(),
	});
	
	try {
		await newProblem.save();
		res.status(200).json(newProblem);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};


module.exports = problemController;
