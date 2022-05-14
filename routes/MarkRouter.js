const MarkModel = require('../models/MarkModel');

const marksRouter = require('express').Router();

//add mark details
marksRouter.post('/', async (req,res) => {
    const { groupId, submissionType, marks } = req.body.markDetails;
    const mark = new MarkModel({ groupId, submissionType, marks });
    try {
        await mark.save();
        res.status(200).json("Marks saved successfully");
    } catch (error) {
        console.log(error)
        res.status(400).json("Marks could not be saved");
    }
})



module.exports = marksRouter;