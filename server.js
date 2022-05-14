//importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const groupRegistrationRouter = require("./routes/GroupRegistrationRouter");
const requestRouter = require("./routes/RequestRouter");
const userRoute = require("./routes/UserRoute");
const topicRouter = require("./routes/topicRouter");
const marksRouter = require("./routes/MarkRouter");

//creating express app
const app = express();
require("dotenv").config();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

//configuring dotenv variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

//router
app.use('/groupRegistrations', groupRegistrationRouter);
app.use('/requests', requestRouter);
app.use('/user', userRoute);
app.use('/topics', topicRouter);
app.use('/marks', marksRouter);

//creating express server
app.listen(PORT, async () => {
    
  //mongoDB connection
  try {
     mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); 

    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error);
  }
  console.log(`Express server running at PORT ${PORT}`);
});

