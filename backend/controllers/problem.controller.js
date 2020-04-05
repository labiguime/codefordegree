const Problem = require('../models/problem.model');
const Course = require("../models/course.model");
const Testcase = require("../models/testcase.model");
const mongoose = require('mongoose');
let problemController = {};

problemController.getProblem = async function (req, res) {
	try {
		const {problemId} = req.params;
		const problem = await Problem.findById(problemId).populate('course_id');
		if (!problem) throw Error('Cannot find a problem that matches this id.');
		// We don't need to populate 'course_id' because the course is already known
		res.status(200).json(problem);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

problemController.getProblems = async function(req, res) {
	const {courseId} = res.locals;
	const {testcases} = req.query;
	try {
		let problems = await Problem.find({course_id: courseId});
		let result = problems.map(e => {
			return {
				_id: e._id,
				name: e.name,
				description: e.description,
				mark: e.mark,
				runtime_limit: e.runtime_limit,
				deadline: e.deadline,
				course_id: e.course_id
			}
		})
		if (!problems) throw Error('Cannot find any problem in the Problem table.');
		if(testcases){
			for(let i = 0; i < result.length; ++i){
				let problemTestcases = await Testcase.find({problem_id: result[i]._id});
				problemTestcases = problemTestcases.map(e => {
					return {
							_id: e._id,
							problem_id: e.problem_id,
							hidden: e.hidden,
							stdin: Buffer.from(e.stdin, 'base64').toString('ascii'),
							expected_output: Buffer.from(e.expected_output, 'base64').toString('ascii')
						}
				})
				result[i] = {...result[i], testcases: problemTestcases};
			}
		}
		res.status(200).json(result);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

problemController.createProblem = async function(req, res) {
	const {name, description, mark, runtime_limit, deadline} = req.body;
	const {courseId} = res.locals;
	const userId = req.user_id;
	const newProblem = new Problem({
		name: name,
		description: description,
		mark: mark,
		runtime_limit: runtime_limit,
		deadline: deadline,
		course_id: courseId
	});

	try {
		if (await newProblem.save()) {
			res.status(200).json(newProblem);
		} else {
			throw Error('Cannot save the new problem in the database.');
		}
	} catch (e) {
		res.status(400).json({error: e.message});
	}
};

problemController.deleteProblem = async function(req, res) {
	const {problemId} = req.params;
	const {courseId} = res.locals;
	const userId = req.user_id;

	try {
		if (await Problem.deleteOne({_id: problemId})) {
			res.status(200).json({success: true});
		} else {
			throw Error('Cannot delete this problem.');
		}

	} catch (e) {
		res.status(400).json({error: e.message, success: false});
	}
};

problemController.updateProblem = async function(req, res) {
	const {name, description, mark, runtime_limit, deadline} = req.body;

	const updatedFields = {};
	if(name) updatedFields.name = name;
	if(description) updatedFields.description = description;
	if(mark) updatedFields.mark = mark;
	if(runtime_limit) updatedFields.runtime_limit = runtime_limit;
	if(deadline) updatedFields.deadline = deadline;

	const {problemId} = req.params;

	try {
		const updatedProblem = await Problem.updateOne({_id: problemId}, 
								    updatedFields
									, {runValidators: true});
		if (!updatedProblem) {
			throw Error('Cannot update this problem.');

		}
		res.status(200).json({success: true});

	} catch (e) {
		res.status(400).json({error: e.message, success: false});
	}
};

module.exports = problemController;
