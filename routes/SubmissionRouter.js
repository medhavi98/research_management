const SubmissionModel = require('../models/SubmissionModal');

const submissionRouter = require('express').Router();

//add submission details
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

//get submission details
submissionRouter.get('/getSubmissions/:groupId', async (req,res) => {
    const { groupId } = req.params;

    try {
        const submissions = await SubmissionModel.find({groupId});
        res.status(200).json({submissions});
    } catch (error) {
        res.status(400).json("Submissions retrieving failed");
    }
})

module.exports = submissionRouter;