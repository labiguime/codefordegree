'use-strict'
const Testcase = require("../models/testcase.model");
module.exports = {

    getTestcase: (req, res, next) => {
        const {testcaseId} = req.params;
        Testcase.findById({_id: testcaseId}, (err, testcase) => {
            if(err || !testcase){
                return res.status(404).json({error: "Course not found"});
            }
            testcase.expected_output = Buffer.from(testcase.expected_output, 'base64').toString("ascii");
            testcase.stdin = Buffer.from(testcase.stdin, 'base64').toString('ascii');
            return res.status(200).json(testcase);
        })
    },

    getTestcases: (req, res, next) => {
        const {problemId} = res.locals;
        Testcase.find({problem_id: problemId}, (err, testcases) => {
            if(err){
                return res.status(500).json({error: "Internal Server Error"});
            }
            testcases.forEach(e => {
                e.expected_output = Buffer.from(e.expected_output, 'base64').toString('ascii');
                e.stdin = Buffer.from(e.stdin, 'base64').toString('ascii');
            })
            return res.status(200).json(testcases);
        })

    },

    createTestcase: (req, res, next) => {
        let {stdin="", expected_output="", hidden} = req.body;
        expected_output = Buffer.from(expected_output).toString('base64');
        stdin = Buffer.from(stdin).toString('base64');
        const {problemId} = res.locals;
        const newTestcase = new Testcase({stdin, expected_output, problem_id: problemId, hidden});
        newTestcase.save(error => {
            if(error){
                return res.status(400).json({error: error});
            }
            newTestcase.expected_output = Buffer.from(newTestcase.expected_output, 'base64').toString('ascii');
            newTestcase.stdin = Buffer.from(newTestcase.stdin, 'base64').toString('ascii');
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
        const {stdin, expected_output, hidden} = req.body;
        const updatedObj = {};
        if(stdin) updatedObj.stdin = Buffer.from(stdin).toString('base64');
        if(expected_output) updatedObj.expected_output = Buffer.from(expected_output).toString('base64');
        if(hidden) updatedObj.hidden = hidden;
        const {testcaseId} = req.params;
        Testcase.updateOne({_id: testcaseId}, updatedObj, (err) => {
            if(err){
                return res.status(400).json({error: error});
            }
            return res.status(200).json({});
        })
    },

    updateTestcases: async (req, res, next) => {
        const {testcases=[], deletedTestcases=[]} = req.body;
        const {problemId} = res.locals;
        const result = [];
        for(let i = 0; i < testcases.length; ++i){
            let testcase = testcases[i];
            if(testcase.stdin){
                testcase.stdin = Buffer.from(testcase.stdin).toString('base64');
            }
            if(testcase.expected_output){
                testcase.expected_output = Buffer.from(testcase.expected_output).toString('base64');
            }
            try{
                let res = {};
                if(testcase._id){
                    res = await Testcase.findByIdAndUpdate({_id: testcase._id}, 
                                {$set: {...testcase}}, 
                                {new: true});
   
                }else{
                    res = await new Testcase({...testcase, problem_id: problemId}).save();
                }
                if(res.expected_output) res.expected_output = Buffer.from(res.expected_output, 'base64').toString('ascii');
                if(res.stdin) res.stdin = Buffer.from(res.stdin, 'base64').toString('ascii');
                result.push(res);
            }catch(error){
                console.log(error);
                return res.status(500).json({error: error});
            }
        }
        for(let i = 0; i < deletedTestcases.length; ++i){
            let deleted = deletedTestcases[i];
            try{
                await Testcase.deleteOne({_id: deleted._id});
            }catch(error){
                return res.status(500).json({error: error});
            }
        }
        return res.status(200).json(result);
    },

}