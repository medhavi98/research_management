const RequestModel = require('../models/RequestModel');

const requestRouter = require('express').Router();

requestRouter.post('/', async (req,res) => {
    const { supervisor, groupId, isAccepted, topicName, topicDescription, review } = req.body.requestDetails;
    const request = new RequestModel({ supervisor, groupId, isAccepted, topicName, topicDescription, review });
    try {
        await request.save();
        res.status(200).json("Request saved successfully");
    } catch (error) {
        res.status(400).json("Request could not be saved");
    }
})

requestRouter.post('/edit/:requestId', async (req,res) => {
    const { requestId } = req.params;
    const { supervisor, isAccepted, topicName, topicDescription, review } = req.body.requestDetails;
    const editedRequest = { supervisor, isAccepted, topicName, topicDescription, review };

    try {
        await RequestModel.findOneAndUpdate({_id: requestId}, editedRequest);;
        res.status(200).json("Request details updated successfully");
    } catch (error) {
        res.status(400).json("Request details updated failed");
    }
})
module.exports = requestRouter;