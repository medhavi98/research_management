const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
    groupName : {
        type: String,
        required: true
    },
    studentIds: {
        type: [String],
        required: true,
    },
    groupLeaderId: {
        type: String,
        required: true,
    },
    supervisorId: {
        type: String,
        required: true,
    },
    coSupervisorId: {
        type: String,
        required: true,
    },
    panelMemberIds: {
        type: [String],
        required: true,
    },
}, {collection : 'groups'})

const GroupModel = mongoose.model("GroupModel" , groupSchema);
module.exports = GroupModel;