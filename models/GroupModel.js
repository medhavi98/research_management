const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    groupName: {
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
      required: false,
    },
    coSupervisorId: {
      type: String,
      required: false,
    },
    panelMemberIds: {
      type: [String],
      required: false,
    },
  },
  { collection: "groups" }
);

const GroupModel = mongoose.model("GroupModel", groupSchema);
module.exports = GroupModel;
