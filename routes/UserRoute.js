const router = require("express").Router();
const userDetails = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const GroupModel = require("../models/GroupModel");

router.post("/", (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const details = new userDetails({
      fullName: req.body.fullName,
      department: req.body.department,
      phone: req.body.phone,
      sliitEmail: req.body.sliitEmail,
      personalEmail: req.body.personalEmail,
      groupId: req.body.groupId,
      nic: req.body.nic,
      studentId: req.body.studentId,
      staffId: req.body.staffId,
      interestFields: req.body.interestFields,
      registerType: req.body.registerType,
      userType: req.body.userType,
      password: hash,
    });
    details
      .save()
      .then((user) => {
        res.json({ message: "Registration is successful.", user });
      })
      .catch((err) => {
        res.json({ error: "Registration failed. Please try again!" });
      });
  });
});

router.post("/login", async (req, res) => {
  console.log("login");
  const { email, password } = req.body;
  const user = await userDetails.findOne({ personalEmail: email });

  if (!user) {
    return res.json({ error: "Incorrect email address!" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  // const token = await login.generateAuthToken();

  // res.cookie("JWTToken", token, {
  //     expires: new Date(Date.now() + 25892000000),
  //     httpOnly: true
  // })

  if (!isMatch) {
    res.json({ error: "Incorrect password!" });
  } else {
    res.json({ message: "Login is successful.", user });
  }
});

// '/:interestFields/:registerType'
router.get(
  `/interestFields/:registerType/:interestFields`,
  async (req, res) => {
    const registerType = req.params.registerType;
    const interestFields = req.params.interestFields;

    try {
      const user = await userDetails.find({
        $and: [
          { registerType: registerType },
          { interestFields: interestFields },
        ],
      });

      if (user.length > 0) {
        res.status(200).json({ user });
      } else {
        res
          .status(404)
          .json("This user have not specify the research interestFields");
      }
    } catch (error) {
      res.status(400).json("user retrieving failed");
    }
  }
);

//get one user details
router.get(`/userDetails`, async (req, res) => {
  try {
    let userNames = [];
    const groups = await GroupModel.find({});
    for (let index = 0; index < groups.length; index++) {
      let studentNames = [];
      let panelMemberNames = [];
      let supervisorName = "";
      let coSupervisorName = "";
      const students = await userDetails.find(
        {
          _id: { $in: groups[index].studentIds },
        },
        {
          _id: 0,
          fullName: 1,
        }
      );

      //FIXME finish this
      // const panelMembers = await userDetails.find(
      //     {
      //         _id: { $in: groups[index].panelMemberIds },
      //     },
      //     {
      //         _id: 0,
      //         fullName: 1
      //     });

      students.forEach((student) => {
        studentNames.push(student.fullName);
      });

      // panelMembers.forEach(student => {
      //     panelMemberNames.push(student.fullName);
      // });

      if (groups[index].supervisorId) {
        let supervisor = await userDetails.findById(groups[index].supervisorId);
        supervisorName = supervisor.fullName;
      }
      if (groups[index].coSupervisorId) {
        let coSupervisor = await userDetails.findById(
          groups[index].coSupervisorId
        );
        coSupervisorName = coSupervisor.fullName;
      }

      userNames.splice(index, 0, {
        studentNames: studentNames,
        panelMemberNames: panelMemberNames,
        supervisorName: supervisorName,
        coSupervisorName: coSupervisorName,
        groupName: groups[index].groupName,
      });
      // userNames[index].supervisorId = group.supervisorId;
      // userNames[index].coSupervisorId = group.coSupervisorId;
    }
    res.json({ userNames });
  } catch (error) {
    res.status(200).json(error);
  }
});

//get user information
router.get("/getOneUserDetails/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userDetails.findOne({ _id: userId });
    res.json({ user });
  } catch (error) {
    res.json({ error });
  }
});

//get group ids for a single user
router.get("/getGroupIds/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userDetails.findOne({ _id: userId });
    if (user.groupIds.length > 0) {
      res.json({ groupIds: user.groupIds });
    } else {
      res.json({ groupIds: [] });
    }
  } catch (error) {
    res.json({ error });
  }
});

router.get("/getPanelMembers", async (req, res) => {
  console.log("panel members fetched");
  try {
    await userDetails.find({ registerType: "Panel-Member" }).then((result) => {
      console.log("data fetched");
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json("panel member fetching failed", error);
  }
});

router.get("/getSupervisors", async (req, res) => {
  console.log("Supervisor members fetched");
  try {
    await userDetails.find({ registerType: "Supervisor" }).then((result) => {
      console.log("data fetched");
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json("Supervisor member fetching failed", error);
  }
});

router.get("/getCosupervisor", async (req, res) => {
  console.log("Co-Supervisor fetched");
  try {
    await userDetails.find({ registerType: "Co-Supervisor" }).then((result) => {
      console.log("data fetched");
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json("Co-Supervisorr fetching failed", error);
  }
});

//get all user details
router.get("/getAllUserDetails", async (req, res) => {
  try {
    const users = await userDetails.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json("Co-Supervisorr fetching failed", error);
  }
});

//edit one user details
router.post("/editUserDetails/:userId", async (req, res) => {
  const { userId } = req.params;
  const { personalEmail, phone } = req.body;
  try {
    const user = await userDetails.findById(userId);
    user.personalEmail = personalEmail;
    user.phone = phone;
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json("Co-Supervisorr fetching failed", error);
  }
});

//delete one user details
router.delete("/deleteUser/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userDetails.findByIdAndDelete(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json("Co-Supervisorr fetching failed", error);
  }
});

module.exports = router;
