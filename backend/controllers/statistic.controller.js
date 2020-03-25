const ProblemSubmission = require("../models/problem_submission.model");
const {statusId} = require("../models/constants");

module.exports = {
    getProblemSubmissionStat: async (req, res, next) => {
        const userId = req.user_id;
        ProblemSubmission.find({user_id: userId})
                        .populate('problem_id')
                        .exec((error, userSubmissions) => {
            if(error){
                return res.status(500).json({error: "Internal server error"});
            }
            let acceptedSub = [], 
                wrongAnswerSub = [], 
                compileErrorSub = [], 
                runtimeErrorSub = [];
            userSubmissions.forEach(sub => {
                if(sub.status.id == statusId.Accepted){
                    acceptedSub.push(sub);
                }else if(sub.status.id == statusId.COMPILATION_ERROR){
                    compileErrorSub.push(sub);
                }else if(sub.status.id == statusId.WRONG_ANSWER){
                    wrongAnswerSub.push(sub);
                }else if(statusId.RUNTIME_ERROR_GENERAL.includes(sub.status.id)){
                    runtimeErrorSub.push(sub);
                }
            });
            return res.status(200).json({acceptedSub, wrongAnswerSub, compileErrorSub, runtimeErrorSub});


        })
    }
}