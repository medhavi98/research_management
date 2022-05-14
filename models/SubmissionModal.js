const mongoose = require('mongoose');
const { Schema } = mongoose;

const submissionSchema = new Schema({
    submissionType: {
        type: String,
    },
    groupId: {
        type: String,
    },
    department: {
        type: String,
    },
}, {collection : 'submissions'})

const SubmissionModel = mongoose.model("SubmissionModel" , submissionSchema);
module.exports = SubmissionModel;