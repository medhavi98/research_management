const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
    fullName: {
        type: String,
    },
    department: {
        type: String,
    },
    phone: {
        type: String,
    },
    sliitEmail: {
        type: String,
    },
    personalEmail: {
        type: String,
    },
    nic: {
        type: String,
    },
    studentId: {
        type: String,
    },
    staffId: {
        type: String,
    },
    interestFields: {
        type: [String],
    },
    registerType: {
        type: [String],
    },
    userType: {
        type: String,
    },
    password: {
        type: String,
    },
    groupIds: {
        type: [String],
        default: [],
    }
}, { collection: 'users' })

// userDetailsSchema.methods.generateAuthToken = async function() {
//     try {
//         let token = jwt.sign({_id : this._id}, "aaaabbbbccccddddeeeeffffggggtttt");
//         this.tokens = this.tokens.concat({token : token});
//         await this.save();
//         return token;
//     } catch(error) {
//         console.log(error);
//     }
// }

const userDetails = mongoose.model("UserDetails", userDetailsSchema);
module.exports = userDetails;