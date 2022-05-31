const MessageModel = require('../models/MessageModal');
const _ = require('lodash');
const messageRouter = require('express').Router();
const userDetails = require('../models/UserModel');
const GroupModel = require("../models/GroupModel");

//add messages
messageRouter.post('/', async (req, res) => {
    const { groupId, senderId, message, time } = req.body.message;

    const messageDoc = await new MessageModel({ groupId, senderId, message, time });

    try {
        await messageDoc.save();
        res.status(200).json("Message added successfully");
    } catch (error) {
        res.status(400).json("Message could not be saved");
    }
})

//get messages
messageRouter.get('/getMessages/:receiverId', async (req, res) => {
    const { receiverId } = req.params;

    try {
        const messages = await MessageModel.find({ receiverId });
        res.status(200).json({ messages });
    } catch (error) {
        res.status(400).json("Messages retrieving failed");
    }
})

//get messages
messageRouter.get('/getMessages/:receiverId', async (req, res) => {
    const { receiverId } = req.params;

    try {
        const messages = await MessageModel.find({ receiverId });
        res.status(200).json({ messages });
    } catch (error) {
        res.status(400).json("Messages retrieving failed");
    }
})

//get messages by groupId
messageRouter.get('/getMessagesByGroup/:groupIds', async (req, res) => {
    const { groupIds } = req.params;
    const groupIdsArr = JSON.parse(groupIds);

    if (groupIdsArr === []) {
        return res.status(200).json({ messages: [], messageLength: 0 });;
    }

    try {
        let messages = await MessageModel.find({ groupId: { $in: groupIdsArr } }).sort({ "_id": -1 });
        const groupNames = await GroupModel.find({ _id: { $in: groupIdsArr } })
        const users = await userDetails.find();
        messages.map((msg, index) => {
            const user = _.find(users, item => {
                return item._id.toString() === msg.senderId;
            });
            const group = _.find(groupNames, item => {
                return item._id.toString() === msg.groupId;
            });
            messages[index] = { ...messages[index].toObject(), senderName: user.fullName, groupName: group.groupName };
        });
        if (messages.length > 0) {
            const grouped = _.mapValues(_.groupBy(messages, 'groupId'));
            const arr = Object.keys(grouped).map((key, index) => [index, grouped[key]]);
            res.status(200).json({ messages: arr, messageLength: messages.length });
        } else if (messages.length === 0 && groupNames) {
            let arr = [];
            groupNames.map((grp, index) => {
                const innerArr = [
                    [],
                    [
                        {
                            groupId: grp._id,
                            senderName: grp.groupName,
                            groupName: grp.groupName,
                            noMessages: true,
                        }
                    ]
                ]

                arr[index] = innerArr;
            })
            res.status(200).json({ messages: arr, messageLength: 1 });
        }
    } catch (error) {
        res.status(400).json("Messages retrieving failed");
    }
})

module.exports = messageRouter;

