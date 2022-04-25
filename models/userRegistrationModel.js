const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
    fullName : {
        type: String,
        required:true
    },
    department : {
        type: String,
        required:true
    },
    phone : {
        type: String,
        required:true
    },
    sliitEmail : {
        type: String,
        required:true
    },
    personalEmail : {
        type: String,
        required:true
    },
    nic : {
        type: String,
        required:true
    },
    studentId : {
        type: String,
        required:false
    },
    interestFields : {
        type: String,
        required:false
    },
    registerType : {
        type: String,
        required:false
    },
    stdOrStaff : {
        type: String,
        required:true
    },
    password : {
        type : String,
        required : true
    },
    tokens : [
        {
            token : {
                type: String,
                required : true
            }
        }
    ],  
})

userDetailsSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({_id : this._id}, "aaaabbbbccccddddeeeeffffggggtttt");
        this.tokens = this.tokens.concat({token : token});
        await this.save();
        return token;
    } catch(error) {
        console.log(error);
    }
}

const userDetails = mongoose.model("UserDetails" , userDetailsSchema);
module.exports = userDetails;