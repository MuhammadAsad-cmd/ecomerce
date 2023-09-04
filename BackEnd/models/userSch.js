let mongoose = require('mongoose');
let validator = require('validator');
let bcryptjs = require('bcryptjs')
let crypto = require('crypto')

let jwt = require('jsonwebtoken')

let userSch = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [4, "name cat't be samller then 4 charactor"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validater: [validator.isMail, "please enter valid email"]
    },
    password: {
        type: String,
        required: true,
        select: false,
        minLength: 6

    },
    role: {
        type: String,
        required: true,
        default: 'user'

    },
    avatar: [{
        public_id: {
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        }
    }],
    joiningDate:{
        type:Date,
        default:Date.now()

    },
    resetPassToken: String,
    resetPassTokenExpiry: Date


});
userSch.methods.generateToken = async function () {
    let token = await jwt.sign({ id: this._id }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIREY })
    return token;
};
userSch.methods.verifyPass=async function(userPass){
    return await bcryptjs.compare(userPass,this.password)
}
//generate resetpassword token
userSch.methods.resetPasswordToken=async function(){
  let resetPasswordToken= await crypto.randomBytes(20).toString('hex');
  this.resetPassToken=await crypto.createHash('sha256').update(resetPasswordToken).digest('hex');
  this.resetPassTokenExpiry=Date.now()+5*60*1000
  return resetPasswordToken
}
userSch.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 10)
    }
    next()

});

module.exports = mongoose.model('users', userSch)