const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema({
    supervisor: {
        type: Object,
    },
    groupId: {
        type: String,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    topicName: {
        type: String,
    },
    topicDescription: {
        type: String,
    },
    review: {
        type: String,
    },
}, { collection: 'requests' })

const RequestModel = mongoose.model("RequestModel", requestSchema);
module.exports = RequestModel;