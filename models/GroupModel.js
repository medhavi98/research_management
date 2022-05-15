const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
    groupName : {
        type: String,
    },
    studentIds: {
        type: [String],
    },
    groupLeaderId: {
        type: String,
    },
    supervisorId: {
        type: String,
    },
    coSupervisorId: {
        type: String,
    },
    panelMemberIds: {
        type: [String],
    },
}, {collection : 'groups'})

const GroupModel = mongoose.model("GroupModel" , groupSchema);
module.exports = GroupModel;