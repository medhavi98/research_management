const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
    },
    studentIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDetails",
      },
    ],
    groupLeaderId: {
      type: String,
    },
    supervisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDetails",
      required: false,
    },
    coSupervisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDetails",
      required: false,
    },
    panelMemberIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDetails",
        required: false,
      },
    ],
    groupDocuments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "adminDocuments",
        required: false,
      },
    ],
  },
  { collection: "groups" }
);

const GroupModel = mongoose.model("GroupModel", groupSchema);
module.exports = GroupModel;
