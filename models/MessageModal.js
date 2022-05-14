const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    groupId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    receiverId: {
        type: String,
    },
    message: {
        type: String,
    },
}, {collection : 'messages'})

const MessageModel = mongoose.model("MessageModel" , messageSchema);
module.exports = MessageModel;