const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
    userId: {
        type: String,
    },
    notification: {
        type: String,
    },
}, {collection : 'notifications'})

const NotificationModel = mongoose.model("NotificationModel" , notificationSchema);
module.exports = NotificationModel;