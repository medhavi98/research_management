const router = require('express').Router();
const { response } = require('express');
const userDetails = require('../models/userRegistrationModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/' , (req,res) => {
    bcrypt.hash(req.body.password , 10).then(hash => {

        const details = new userDetails({
            fullName : req.body.fullName,
            department : req.body.department,
            phone : req.body.phone,
            sliitEmail : req.body.sliitEmail,
            personalEmail : req.body.personalEmail,
            nic : req.body.nic,
            studentId : req.body.studentId,
            interestFields : req.body.interestFields,
            registerType : req.body.registerType,
            stdOrStaff : req.body.stdOrStaff,
            password : hash
        });
        details.save().then(() => {
            res.json('User details Added');
        }).catch((err) => {
            console.log('Error has occured',err);
        })
    })
})

router.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const login = await userDetails.findOne({email : email});
    const isMatch = await bcrypt.compare(password , login.password);
    const token = await login.generateAuthToken();

    res.cookie("JWTToken", token , {
        expires : new Date(Date.now() + 25892000000),
        httpOnly : true
    })

    if(!isMatch) {
        console.log("Incorrect Password");
    }
    else if(!login){
        res.json({error : "Login Failed"});
    }
    else {
        res.json({message : "Login Successgull", id : login._id});
    }
})