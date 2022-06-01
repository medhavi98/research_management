const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    groupId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    message: {
        type: String,
    },
    time: {
        type: String,
        default: new Date().toLocaleString()
    }
}, { collection: 'messages' })

const MessageModel = mongoose.model("MessageModel", messageSchema);
module.exports = MessageModel;