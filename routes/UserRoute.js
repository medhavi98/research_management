const router = require('express').Router();
const userDetails = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, 10).then(hash => {

        const details = new userDetails({
            fullName: req.body.fullName,
            department: req.body.department,
            phone: req.body.phone,
            sliitEmail: req.body.sliitEmail,
            personalEmail: req.body.personalEmail,
            nic: req.body.nic,
            studentId: req.body.studentId,
            staffId: req.body.staffId,
            interestFields: req.body.interestFields,
            registerType: req.body.registerType,
            userType: req.body.userType,
            password: hash
        });
        details.save().then((user) => {
            res.json({ message: "Registration is successful.", user });
        }).catch((err) => {
            res.json({ error: "Registration failed. Please try again!" });
        })
    })
})

router.post('/login', async (req, res) => {
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
    }
    else {
        res.json({ message: "Login is successful.", user });
    }
})

// '/:interestFields/:registerType'
router.get(`/interestFields/:registerType/:interestFields`, async (req, res) => {

    const registerType = req.params.registerType;
    const interestFields = req.params.interestFields;

    try {
        const user = await userDetails.find({
            $and: [
                { registerType: registerType },
                { interestFields: interestFields }
            ]
        });

        if (user.length > 0) {
            res.status(200).json({ user });
        } else {
            res.status(404).json("This user have not specify the research interestFields");
        }

    } catch (error) {
        res.status(400).json("user retrieving failed");
    }

})

//get one user details 
router.get(`/userDetails/:userId`, async (req, res) => {

    const { userId } = req.params;

    try {
        const user = await userDetails.findById(userId);

        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(200).json({ error: "user retrieving failed" });
        }
    } catch (error) {
        res.status(200).json({ error: "user retrieving failed" });
    }

})

module.exports = router;