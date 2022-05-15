const mongoose = require('mongoose');
const { Schema } = mongoose;

const markSchema = new Schema({
    groupId : {
        type: String,
    },
    submissionType : {
        type: String,
    },
    marks: {
        type: String,
    },
}, {collection : 'marks'})

const MarkModel = mongoose.model("MarkModel" , markSchema);
module.exports = MarkModel;