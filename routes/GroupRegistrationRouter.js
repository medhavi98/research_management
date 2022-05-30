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
        studentId: studentIds[i],
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
      .then((response) => {
        console.log("Group Details Saved", response);
        res.status(200).json(response);
      })
      .catch((error) => {
        console.log("Group Details Saving error", error);
        res.status(500).json(error);
      });
    console.log("stdID", stdID);
  } catch (err) {
    console.error("error while requesting ", err);
    res.status(500).json(error);
  }

  // //TODO:- get student ids form user collection
  // const group = await new GroupModel({
  //   groupName,
  //   studentIds,
  //   groupLeaderId,
  //   supervisorId,
  //   coSupervisorId,
  //   panelMemberIds,
  // });

  // try {
  //   await group.save();
  //   res.status(200).json("Group registration completed");
  // } catch (error) {
  //   res.status(400).json("Group registration failed");
  // }
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
  const { memberOne, memberTwo, memberThree } = req.body;
  // try {
  //   await GroupModel.updateOne(
  //     { _id: groupId },
  //     {
  //       $push: {
  //         panelMemberIds: { memberOne, memberTwo, memberThree },
  //       },
  //     }
  //   )
  //     .then(async (response) => {
  //       console.log("Panel member added to the group");
  //       res.status(200).json(response);
  //     })
  //     .catch((err) => {
  //       res.status(400).json(err);
  //     });
  // } catch (error) {
  //   res.status(400).json("panel member adding failed");
  // }
});

module.exports = groupRegistrationRouter;
