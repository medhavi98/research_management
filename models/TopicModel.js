const mongoose = require('mongoose');
const { Schema } = mongoose;

const topicSchema = new Schema({
    submissionType: {
        type: String,
    },
    supervisorId: {
        type: String,
    },
    groupId: {
        type: String,
    },
    topicName: {
        type: String,
    },
    topicDescription: {
        type: String,
    },
    researchField: {
        type: String,
    },
}, {collection : 'topics'})

const TopicModel = mongoose.model("TopicModel" , topicSchema);
module.exports = TopicModel;