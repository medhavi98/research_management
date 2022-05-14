const GroupModel = require('../models/GroupModel');

const groupRegistrationRouter = require('express').Router();

groupRegistrationRouter.post('/', async (req,res) => {
    const { groupDetails, studentIds, groupLeaderId, supervisorId, coSupervisorId, panelMemberIds } = req.body.groupDetails;
    const count = await GroupModel.count();
    let groupName = `AF_Group_${count+1}`;
    const group = await new GroupModel({ groupDetails, groupName, studentIds, groupLeaderId, supervisorId, coSupervisorId, panelMemberIds });

    try {
        await group.save();
        res.status(200).json("Group registration completed");
    } catch (error) {
        res.status(400).json("Group registration failed");
    }
})

module.exports = groupRegistrationRouter;