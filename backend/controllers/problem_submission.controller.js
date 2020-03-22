const Problem = require("../models/problem.model");
const ProblemSubmission = require("../models/problem_submission.model");
const JudegeSubmission = require("../models/judge_submission.model");
const Testcase = require("../models/testcase.model");
const {languageMap} = require("../models/constants");
const axios = require("axios");


function getJudgePostSubmissionUrl(){
    return "https://api.judge0.com/submissions/?base64_encoded=false&wait=false";
}

function getJudgeGetSubmissionUrl(token){
    return `https://api.judge0.com/submissions/${token}?base64_encoded=false`;
}

module.exports = {
    getProblemSubmission: async (req, res, next) => {
        const {problemId} = res.locals;
        const userId = req.user_id;
        const {submissionId} = req.params;
        try{
            const submission = (await ProblemSubmission.findById(submissionId))
                                .populate('judge_submission_ids').populate("testcase_results");
            if(!submission) 
                return res.status(404).json({error: "Submission not found"});
            if(submission.userId != userId)
                return res.status(400).json({error: "You are not owner of requested submission"});
            if(submission.problemId != problemId)
                return res.status(404).json({error: "Submission not found with provided problem"});
            return res.status(200).json(submission);
        }catch(e){
            return res.status(500).json({error: "Internal server error"});
        }
    },

    getProblemSubmissions: async (req, res, next) => {
        const {problemId} = res.locals;
        const userId = req.user_id;
        try{
            const submissions = await ProblemSubmission.find({problem_id: problemId, user_id: userId});
            return res.status(200).json(submissions);
        }catch(e){
            console.log(e);
            return res.status(500).json({error: "Internal server error"});
        }
    },

    createProblemSubmission: async (req, res, next) => {
        const {courseId, problemId} = res.locals;
        const userId = req.user_id;
        const {source_code, language_id} = req.body;
        if(!language_id){
            return res.status(404).json({error: "Submission needs a language_id value"})
        }
        const language = languageMap.find(e => e.id == language_id);
        if(!language)
            return res.status(422).json({error: `Language with id ${language_id} doesn't exist`});
        let problem;
        try{
            problem = await Problem.findById(problemId);
            if(!problem)
                return res.status(404).json({error: "Problem not found"});
        }catch(e){
            console.log(e);
            return res.status(500).json({error: "Internal server error"});
        }
        const problemSub = new ProblemSubmission({source_code, language, problem_id: problemId});
        //Query for all test cases of problem
        let testcases = [];
        try{
            testcases = await Testcase.find({problem_id: problemId});
        }catch(e){
            console.log(e);
            return res.staus(500).json({error: "Internal server error"});
        }
        //Call third-party api to execute judge submission
        const judgeSubmissions = [];
        for(let i = 0; i < testcases.length; ++i){
            const {_id, expected_output, stdin} = testcases[i];
            let judgeSubmission = new JudegeSubmission({
                                    testcase_id: _id});
            try{
                const sub = await axios.post(getJudgePostSubmissionUrl(), {
                                source_code,
                                language_id,
                                expected_output,
                                stdin,
                                runtime_limit: problem.runtime_limit
                            });
                judgeSubmission.token = sub.data.token;
                judgeSubmissions.push(judgeSubmission);
                problemSub.testcase_results.push({testcase_id: _id});
            }catch(e){
                console.log(e)
                return res.status(500).json({error: "Internal server error"});
            }
        }

        const promises = [];
        //Retrieve judge submisison result from third-party api
        setTimeout(async () => {
            judgeSubmissions.forEach(({token}) => {
                try{
                    const sub = axios.get(getJudgeGetSubmissionUrl(token));
                    promises.push(sub);
                }catch(e){
                    console.log(e);
                    return res.status(500).json({error: "Internal server error"});
                }
            });
            //Once all promises are resolved
            axios.all(promises).then(axios.spread(async (...responses) => {
                responses.forEach(res => {
                    let sub = judgeSubmissions.find(e => e.token = res.data.token);
                    const {memory, time, status} = res.data;
                    sub.memory = memory;
                    sub.time = time;
                    sub.status = status;

                });
                let acceptedSub = 0;
                for(let i = 0; i < judgeSubmissions.length; ++i){
                    let judge = judgeSubmissions[i];
                    try{
                        await judge.save();
                        problemSub.judge_submission_ids.push(judge._id);
                    }catch(e){
                        console.log(e);
                        return res.status(500).json({error: "Internal server error"});
                    }
                    let test = problemSub.testcase_results.find(e => judge.testcase_id == e.testcase_id);
                    if(test){
                        if(judge.status.id == 3){
                            acceptedSub++;
                            test.result = true;
                        }else if(judge.status.id > 3){
                            test.result = false;
                        }
                    }
                    if(judgeSubmissions.length!= 0)
                        problemSub.result = acceptedSub / judgeSubmissions.length;

                }
                problemSub.save(err => {
                    if(err){
                        console.log(err);
                        return res.status(500).json({error: "Internal server error"});
                    }
                    ProblemSubmission.populate(problemSub, [
                        {path: 'problem_id'},
                        {path: 'testcase_ids'}], (err, problemSub) => {
                            if(err){
                                console.log(err);
                                return res.status(500).json({error: "Internal server error"});
                            }
                            return res.status(200).json(problemSub);
                        })
                });
            })).catch(e => {
                console.log(e);
                return res.status(500).json({error: "Internal server error"});
            });
        }, 1000);
        
    }
}