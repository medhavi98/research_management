const NotificationModel = require('../models/NotificationsModel');

const notificationRouter = require('express').Router();

//add notification details
notificationRouter.post('/', async (req,res) => {
    const { userId, notification } = req.body.notificationDetails;
    const notificationDoc = new NotificationModel({ userId, notification });
    try {
        await notificationDoc.save();
        res.status(200).json("Notification saved successfully");
    } catch (error) {
        console.log(error)
        res.status(400).json("Notification could not be saved");
    }
})

//get notification details
notificationRouter.get('/getNotifications/:userId', async (req,res) => {
    const { userId } = req.params;

    try {
        const notifications = await NotificationModel.find({userId});
        res.status(200).json({notifications});
    } catch (error) {
        res.status(400).json("Notification details retrieving failed");
    }
})

module.exports = notificationRouter;