const RequestModel = require('../models/RequestModel');

const requestRouter = require('express').Router();

//add request details
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

//edit request details
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

//delete request details
requestRouter.delete('/delete/:requestId', async (req,res) => {
    const { requestId } = req.params;
    try {
        await RequestModel.findByIdAndDelete(requestId);
        res.status(200).json("Request details deleted successfully");
    } catch (error) {
        res.status(400).json("Request details deleted failed");
    }
})
module.exports = requestRouter;