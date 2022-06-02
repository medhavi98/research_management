const GroupModel = require("../models/GroupModel");
const UserModel = require("../models/UserModel");

const groupRegistrationRouter = require("express").Router();

//add group details
groupRegistrationRouter.post("/", async (req, res) => {
  const {
    studentIds,
    groupLeaderId,
    supervisorId,
    coSupervisorId,
    panelMemberIds,
  } = req.body.groupDetails;
  const count = await GroupModel.count();
  let groupName = `AF_Group_${count + 1}`;

  try {
    console.log("studentIds", studentIds);
    let stdID = [];

    for (let i = 0; i < studentIds.length; i++) {
      let id = await UserModel.findOne({
        studentId: studentIds[i].toUpperCase(),
      });
      console.log("studentId", id._id);
      stdID.push(id._id);
    }

    const group = new GroupModel({
      groupName: groupName,
      studentIds: stdID,
      groupLeaderId: stdID[0],
      supervisorId,
      coSupervisorId,
      panelMemberIds,
    });

    console.log("group", group);

    await group
      .save()
      .then(async (response) => {
        console.log("Group Details Saved", response);

        for (let i = 0; i < stdID.length; i++) {
          await UserModel.updateOne(
            { _id: stdID[i] },
            {
              $push: { groupIds: response._id },
            }
          ).catch((err) => {
            console.error(err);
            res.status(500).json(err);
          });
        }
        res.status(200).json(response);
      })
      .catch((error) => {
        console.log("Group Details Saving error", error);
        res.status(500).json(error);
      });
    console.log("stdID", stdID);
  } catch (err) {
    console.error("error while requesting ", err);
    res.status(500).json(err);
  }
});

//edit group details
groupRegistrationRouter.post("/edit/:groupId", async (req, res) => {
  const { groupId } = req.params;
  const {
    studentIds,
    groupLeaderId,
    supervisorId,
    coSupervisorId,
    panelMemberIds,
  } = req.body.groupDetails;
  const EditedGroup = {
    studentIds,
    groupLeaderId,
    supervisorId,
    coSupervisorId,
    panelMemberIds,
  };

  try {
    await GroupModel.findOneAndUpdate({ _id: groupId }, EditedGroup);
    res.status(200).json("Group details updated successfully");
  } catch (error) {
    res.status(400).json("Group details updated failed");
  }
});

//delete group details
groupRegistrationRouter.delete("/delete/:groupId", async (req, res) => {
  const { groupId } = req.params;
  try {
    await GroupModel.findByIdAndDelete(groupId);
    res.status(200).json("Group details deleted successfully");
  } catch (error) {
    res.status(400).json("Group details deleted failed");
  }
});

//get group details
groupRegistrationRouter.get("/getGroupDetails/:groupId", async (req, res) => {
  const { groupId } = req.params;

  try {
    const groups = await GroupModel.findOne({ _id: groupId });
    res.status(200).json({ groups });
  } catch (error) {
    res.status(400).json("groups details updated failed");
  }
});

groupRegistrationRouter.put("/addPanelMembers/:groupId", async (req, res) => {
  const { groupId } = req.params;
  console.log("Add Panel members");
  const { memberOne, memberTwo, memberThree } = req.body;
  try {
    await GroupModel.updateOne(
      { _id: groupId },
      {
        $push: {
          panelMemberIds: [memberOne, memberTwo, memberThree],
        },
      }
    )
      .then(async (response) => {
        console.log("Panel member added to the group");
        let members = [memberOne, memberTwo, memberThree];
        for (let i = 0; i < members.length; i++) {
          await UserModel.updateOne(
            { _id: members[i] },
            {
              $push: {
                groupIds: groupId,
              },
            }
          ).catch(async (err) => {
            res.status(400).json("panel member adding failed", err);
          });
        }
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).json("panel member adding failed", error);
  }
});

groupRegistrationRouter.get("/", async (req, res) => {
  console.log("group details gets");
  try {
    GroupModel.find()
      .populate("supervisorId", "fullName")
      .populate("coSupervisorId", "fullName")
      .populate("panelMemberIds", "fullName")
      .populate("studentIds", "fullName")
      .then((response) => {
        console.log("groups fetching success");
        res.status(200).json(response);
      });
  } catch (error) {
    res.status(400).json("group details fetching failed", error);
  }
});

module.exports = groupRegistrationRouter;
