const TopicModel = require('../models/TopicModel');

const topicRouter = require('express').Router();

//add Topic details
topicRouter.post('/', async (req,res) => {
    const { submissionType, supervisorId, groupId, topicName, topicDescription, researchField } = req.body.topicDetails;
    const topic = new TopicModel({ submissionType, supervisorId, groupId, topicName, topicDescription, researchField });
    try {
        await topic.save();
        res.status(201).json("Topic saved successfully");
    } catch (error) {
        console.log(error)
        res.status(400).json("Topic could not be saved");
    }
})

//edit Topic details
topicRouter.put('/edit/:topicId', async (req,res) => {
    const { topicId } = req.params;
    const { supervisorId, groupId, topicName, topicDescription, researchField } = req.body.topicDetails;
    const editedTopic = { supervisorId, groupId, topicName, topicDescription, researchField };

    try {
        await TopicModel.findOneAndUpdate({_id: topicId}, editedTopic);;
        res.status(200).json("Topic details updated successfully");
    } catch (error) {
        res.status(400).json("Topic details updated failed");
    }
})

//get topic details
topicRouter.get('/getTopic/:groupId', async (req,res) => {
    const { groupId } = req.params;

    try {
        const topics = await TopicModel.find({groupId});
        res.status(200).json({topics});
    } catch (error) {
        res.status(400).json("Topics retrieving failed");
    }
})
module.exports = topicRouter;