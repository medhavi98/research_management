const GroupModel = require('../models/GroupModel');
const RequestModel = require('../models/RequestModel');
const requestRouter = require('express').Router();
const _ = require('lodash');

//add request details
requestRouter.post('/', async (req, res) => {
    const { supervisor, groupId, status, topicName, topicDescription, review } = req.body.requestDetails;
    const request = new RequestModel({ supervisor, groupId, status, topicName, topicDescription, review });
    try {
        await request.save();
        res.status(200).json("Request saved successfully");
    } catch (error) {
        res.status(400).json("Request could not be saved");
    }
})

//edit request details
requestRouter.post('/edit/:requestId', async (req, res) => {
    const { requestId } = req.params;
    const { supervisor, status, topicName, topicDescription, review } = req.body.requestDetails;
    const editedRequest = { supervisor, status, topicName, topicDescription, review };

    try {
        await RequestModel.findOneAndUpdate({ _id: requestId }, editedRequest);;
        res.status(200).json("Request details updated successfully");
    } catch (error) {
        res.status(400).json("Request details updated failed");
    }
})

//delete request details
requestRouter.delete('/delete/:requestId', async (req, res) => {
    const { requestId } = req.params;
    try {
        await RequestModel.findByIdAndDelete(requestId);
        res.status(200).json("Request details deleted successfully");
    } catch (error) {
        res.status(400).json("Request details deleted failed");
    }
})

//get request details
requestRouter.get('/getRequests/:groupId', async (req, res) => {
    const { groupId } = req.params;

    try {
        const requests = await RequestModel.find({ groupId });
        res.status(200).json({ requests });
    } catch (error) {
        res.status(400).json("Requests retrieving failed");
    }
})

requestRouter.get('/getRequestsByUserId/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        let requests = await RequestModel.find({ "supervisor.supervisorId": userId });
        const groups = await GroupModel.find({});
        requests.map(async (request, index) => {
            const group = _.find(groups, item => {
                return item._id.toString() === request.groupId;
            });
            requests[index] = { ...requests[index].toObject(), groupName: group.groupName }
        })
        console.log(requests)
        res.status(200).json({ requests });
    } catch (error) {
        res.status(400).json("Requests retrieving failed");
    }
})
module.exports = requestRouter;