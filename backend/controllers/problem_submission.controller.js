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
        const {userId, problemId} = res.locals;
        const {submissionId} = req.params;
        const submission = (await ProblemSubmission.findById(submissionId))
                            .populate('judege_submission_ids').populate("testcase_results");
        if(!submission) 
            return res.status(404).json({error: "Submission not found"});
        if(submission.userId != userId)
            return res.status(400).json({error: "You are not owner of requested submission"});
        if(submission.problemId != problemId)
            return res.status(404).json({error: "Sumission not found with provided problem"});
        return res.status(200).json(submission);
    },

    getProblemSubmissions: async (req, res, next) => {
        const {userId, problemId} = res.locals;
        const submissions = await ProblemSubmission.find({problem_id: problemId, user_id: userId});
        return res.status(200).json(submissions);
    },

    createProblemSubmission: async (req, res, next) => {
        const {userId, courseId, problemId} = res.locals;
        const {source_code, language_id} = req.body;
        const language = languageMap.find(e => e.id == language_id);
        const problem = await Problem.findById(problemId);
        if(!language)
            return res.status(422).json({error: `Language with id ${language_id} doesn't exist`});
        const problemSub = new ProblemSubmission({source_code, language});
        //TODO: Query for all test cases of problem
        const testcases = await Testcase.find({problem_id: problemId});
        const judgeSubmissions = [];
        testcases.forEach(async ({_id, expected_output, stdin}) => {
            let judgeSubmission = new JudegeSubmission({
                                    testcase_id: _id});
            
            const sub = await axios.post(getJudgePostSubmissionUrl(), {
                            source_code,
                            language_id,
                            expected_output,
                            stdin,
                            runtime_limit: problem.runtime_limit
                        });
            // judgeSubmissionPromises.push(sub);
            judgeSubmission.token = sub.token;
            JudegeSubmissions.push(judgeSubmission);
            problemSub.testcase_results.push({id: _id});
        });

        const promises = [];
        setTimeout(() => {
            judgeSubmissions.forEach(({token}) => {
                const sub = axios.get(getJudgeGetSubmissionUrl(token));
                promises.push(sub);
            });

            axios.all(promises).then(axios.spread((...responses) => {
                responses.forEach(res => {
                    const sub = judgeSubmissions.find(e => token = res.token);
                    sub = {...sub, ...res};
                });
                let acceptedSub = 0;
                judgeSubmissions.forEach(async e => {
                    await e.save(err => {
                        if(err){
                            console.log(err);
                            return res.status(400).json({error: "Cannot create submission code for testcase"});
                        }
                        problemSub.judge_submission_ids.push(e._id);
                    });

                    let test = problemSub.testcase_results.find(e => e.id == e.testcase_id);
                    if(e.status.id == 3){
                        acceptedSub++;
                        test.result = true;
                    }else if(e.status.id > 3){
                        test.result = false;
                    }
                    problemSub.result = acceptedSub / judgeSubmissions.size;
                });
            
            }));
        }, 1000);
        
    }
}