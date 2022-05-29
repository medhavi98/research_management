const MessageModel = require("../models/MessageModal");
const userDetails = require('../models/UserModel');
const messageSubscriber = socket => {
    const changeSteam = MessageModel.watch()
    changeSteam.on("change", async change => {
        if (change.operationType === "insert") {
            console.log(`Sending a message to ${change.fullDocument.groupId} ...`);
            const user = await userDetails.findById(change.fullDocument.senderId);
            socket.emit(`messageTo${change.fullDocument.groupId}`,
                {
                    messageData: { ...change.fullDocument, senderName: user.fullName },
                });
        }
    });
}

module.exports = messageSubscriber;