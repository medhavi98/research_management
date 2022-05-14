const SubmissionModel = require('../models/SubmissionModal');

const submissionRouter = require('express').Router();

//add mark details
submissionRouter.post('/', async (req,res) => {
    const { groupId, submissionType, department } = req.body.submissionDetails;
    const submission = new SubmissionModel({ groupId, submissionType, department });
    try {
        await submission.save();
        res.status(200).json("Submission saved successfully");
    } catch (error) {
        console.log(error)
        res.status(400).json("Submission could not be saved");
    }
})



module.exports = submissionRouter;