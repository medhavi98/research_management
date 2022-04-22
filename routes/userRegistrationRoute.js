const router = require('express').Router();
const { response } = require('express');
const userDetails = require('../models/userRegistrationModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/' , (req,res) => {
    bcrypt.hash(req.body.password , 10).then(hash => {

        const details = new userDetails({
            fullName : req.body.fullName,
            sliitEmail : req.body.sliitEmail,
            personalEmail : req.body.personalEmail,
            
            phone : req.body.phone,

        })
    })
})