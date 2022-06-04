const mongoose = require('mongoose');
const { Schema } = mongoose;

const topicSchema = new Schema({
    supervisorId: {
        type: String,
    },
    coSupervisorId: {
        type: String,
    },
    researchGroup: {
        type: String,
    }, 
    researchField: {
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
}, {collection : 'topics'})

const TopicModel = mongoose.model("TopicModel" , topicSchema);
module.exports = TopicModel;