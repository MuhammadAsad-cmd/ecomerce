const catchAsync = require("../middleware/catchAsycn");
let sendCookies=catchAsync(async(res,user,message)=>{
 let token=await user.generateToken();
let options={
    expires:new Date(Date.now()+process.env.COOKIES_EXP*24*60*60*1000),
    httpOnly:true
}
     res.cookie('token',token,options).status(200).send({
        sms:message,
        acknowledge:true,
        user,
        isAuthentic:true
     })
});
module.exports=sendCookies