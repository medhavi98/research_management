const marksRouter = require("./MarkRouter");
const groupRegistrationRouter = require("./GroupRegistrationRouter");
const requestRouter = require("./RequestRouter");
const userRoute = require("./UserRoute");
const topicRouter = require("./TopicRouter");
const submissionRouter = require("./SubmissionRouter");
const notificationRouter = require("./NotificationRouter");
const messageRouter = require("./MessageRouter");

module.exports = {
    groupRegistrationRouter: groupRegistrationRouter,
    requestRouter: requestRouter,
    userRoute: userRoute,
    topicRouter: topicRouter,
    marksRouter: marksRouter,
    submissionRouter: submissionRouter,
    notificationRouter: notificationRouter,
    messageRouter: messageRouter,
}