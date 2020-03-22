'use-strict'
const Testcase = require("../models/testcase.model");
module.exports = {

    getTestcase: (req, res, next) => {
        const {testcaseId} = req.params;
        Testcase.findById({_id: testcaseId}, (err, testcase) => {
            if(err || !testcase){
                return res.status(404).json({error: "Course not found"});
            }
            return res.status(200).json(testcase);
        })
    },

    getTestcases: (req, res, next) => {
        const {problemId} = res.locals;
        Testcase.find({problem_id: problemId}, (err, testcases) => {
            if(err){
                return res.status(500).json({error: "Internal Server Error"});
            }
            return res.status(200).json(testcases);
        })

    },

    createTestcase: (req, res, next) => {
        const {stdin, expected_output} = req.body;
        const {problemId} = res.locals;
        const newTestcase = new Testcase({stdin, expected_output, problem_id: problemId});
        newTestcase.save(error => {
            if(error){
                return res.status(400).json({error: error});
            }
            return res.status(201).json(newTestcase);
        });
    },

    deleteTestcase: (req, res, next) => {
        const {testcaseId} = req.params;
        Testcase.deleteOne({_id: testcaseId}, error => {
            if(error){
                return res.status(400).json({error: error});
            }
            return res.status(200).json({});
        })
    },

    updateTestcase: (req, res, next) => {
        const {stdin, expected_output} = req.body;
        const updatedObj = {};
        if(stdin) updatedObj.stdin = stdin;
        if(expected_output) updatedObj.expected_output = expected_output;
        const {testcaseId} = req.params;
        Testcase.updateOne({_id: testcaseId}, updatedObj, (err) => {
            if(err){
                return res.status(400).json({error: error});
            }
            return res.status(200).json({});
        })
    }

}