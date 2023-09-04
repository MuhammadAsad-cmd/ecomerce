const catchAsync = require("../middleware/catchAsycn");
let userSch = require('../models/userSch');
const ErrorHandler = require("../utils/errorHandler");
let cloudinary = require('cloudinary')
let crypto = require('crypto')
const sendCookies = require("../utils/sendCookies");
const sendResponce = require("../utils/responceSendFun");
const nodemailer=require('nodemailer')

let registerUser = catchAsync(async (req, res, next) => {

    let { email, password, name, avatar} = req.body;
    // console.log(avatar);
  
    let user = await userSch.findOne({ email });

    if (user) {
        return next(new ErrorHandler('user already registered with this email', 400))
    };
//  console.log(req.body);

try {
    let fileUploaded = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatar",
        width:200,
        crop: "scale"
    })
// console.log(fileUploaded);
    let newUser = await userSch.create({ email, password, name,avatar:{
        
public_id:fileUploaded.public_id,
url:fileUploaded.secure_url
    } });
    // console.log(newUser);
    sendCookies(res, newUser, "register successfully")

} catch (error) {
    return next(new ErrorHandler('there is an error while uploading file ', 400))
}




})

//login user
let login = catchAsync(async (req, res, next) => {

    let { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler('please enter email and password', 400))

    }
    let userfinded = await userSch.findOne({ email }).select('+password');
    if (!userfinded) {
        return next(new ErrorHandler('inCorrect given detail', 400))
    };
    // console.log(await user.resetPasswordToken());

    let isVerify = await userfinded.verifyPass(password)
    if (!isVerify) {
        return next(new ErrorHandler('incorrect user detail', 400))

    }
    let user = await userSch.findOne({ email })




    sendCookies(res, user, "login successfully")

})

//reset password 
let forgetpassword = catchAsync(async (req, res, next) => {

    let { email } = req.body;
    if (!email) {
        return next(new ErrorHandler('please enter email', 401))
    }
    let user = await userSch.findOne({ email });
    if (!user) {
        return next(new ErrorHandler('user not found with given email', 401))

    };

    let token = await user.resetPasswordToken()
    // let message = `${req.protocol}://${req.get('host')}/password/reset/${token}`;
    let message = `${req.protocol}://localhost:3000/password/reset/${token}`;

// nodemaler



const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  
    service: 'gmail', // Replace with your email service provider
  auth: {
    user: process.env.EMAIL, // Your email address
    pass:process.env.PASS,  // Your email password or app password (if using 2-step verification)
  },
  });
  const mailOptions = {
    from: process.env.EMAIL, // Sender address
    to: email, // List of recipients
    subject: 'reset password ', // Subject line
    text: message // Plain text body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        return next(new ErrorHandler(error, 400))
    } else {
         user.save()
        res.status(200).send({sms:"We have send you an Email please check your inbox"})
    }
  });


  
  
 

 
})

// let forgetpassword = catchAsync(async (req, res, next) => {

//     let { email } = req.body;
//     if (!email) {
//         return next(new ErrorHandler('please enter email', 401))
//     }
//     let user = await userSch.findOne({ email });
//     if (!user) {
//         return next(new ErrorHandler('user not found with given email', 401))

//     };

//     let token = await user.resetPasswordToken()
//     // let message = `${req.protocol}://${req.get('host')}/password/reset/${token}`;
//     let message = `${req.protocol}://localhost:3000/password/reset/${token}`;
//     var defaultClient = Brevo.ApiClient.instance;
//     var apiKey = defaultClient.authentications['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'];
//     apiKey.apiKey = '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';
// // nodemaler

// var apiInstance = new Brevo.TransactionalEmailsApi();

// var sendSmtpEmail = new Brevo.SendSmtpEmail({

//     "sender":{ "email":"alishanwebdev@gmail.com", "name":"Brevo"},
//     "subject":"This is my default subject line",
//     "htmlContent":"<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>",
//     "params":{
//        "greeting":"This is the default greeting",
//        "headline":"This is the default headline"
//     },
//   "messageVersions":[
//     //Definition for Message Version 1 
//     {
//         "to":[
//            {
//               "email":email,
              
//            }
           
//         ],
//         "htmlContent":"<!DOCTYPE html><html><body><h1>Modified header!</h1><p>Click on the link to reset your pawssword</p></body></html>",
//         "subject":message
//      }
//     ]
//     });

//     apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
//         console.log('API called successfully. Returned data: ' + data);
//         res.status(200).send({sms:"We have send you an Email please check your inbox"})
//       }, function(error) {
//         console.error(error);
//       });
// // try {
// //     await transporter.sendMail(mailOptions)
// //     await user.save()
// //     res.status(200).send({sms:"We have send you an Email please check your inbox"})
// // } catch (error) {
// //     console.log(error);
// //     return next(new ErrorHandler('something went wrong while sendind email', 400))
// // }

  
  
 

 
// })

//reset password
let resetpassword = catchAsync(async (req, res, next) => {

    let { token } = req.params;
    let { newPassword, repeatPassword } = req.body;
    // console.log(Date.now());
    let userToken = await crypto.createHash('sha256').update(token).digest('hex');
    let user = await userSch.findOne({ resetPassToken: userToken, resetPassTokenExpiry: { $gte: Date.now() } }).select("+password")
    if (!user) {
        return next(new ErrorHandler('user not found', 401))
    };

    if (!newPassword || !repeatPassword) {
        return next(new ErrorHandler('please enter new password', 401))
    }
    if (newPassword !== repeatPassword) {
        return next(new ErrorHandler('password and repeat password not matched', 401))
    };

    user.resetPassToken = undefined;
    user.resetPassTokenExpiry = undefined;
    user.password = newPassword;
    await user.save();
    sendCookies(res, user, "password reset successfully")

})

//change password
let updatePassword = catchAsync(async (req, res, next) => {


    let { oldPassword, newPassword, repeatPassword } = req.body;

    if (!newPassword || !repeatPassword) {
        return next(new ErrorHandler('please enter new password and repeat password', 401))
    }
    if (newPassword !== repeatPassword) {
        return next(new ErrorHandler('password and repeat password not matched', 401))
    };
    // console.log(req.user.id);
    let user = await userSch.findById(req.user.id).select('+password');
    if (!user) {
        return next(new ErrorHandler('user not found', 401))

    }
    let isVerify = await user.verifyPass(oldPassword);
    if (!isVerify) {
        return next(new ErrorHandler('old password not matched', 401))

    }
    if (oldPassword == newPassword) {
        return next(new ErrorHandler('new password should be different from old password', 401))

    }
    user.password = newPassword;
    await user.save();
    sendCookies(res, user, "password updates successfully")

});

//logout the use
let logout = catchAsync(async (req, res, next) => {
    // console.log("logout");
    res.clearCookie('token');
    res.status(200).send({
        acknowledge: true,
        sms: 'logout successfully'
    });

});


//get profile
let profile = catchAsync(async (req, res, next) => {
    let user = await userSch.findById(req.user.id);
    if (!user) {
        return next(new ErrorHandler('user not found please login', 401))

    }
    sendResponce(res, 200, {
        acknowledge: true,
        sms: "user founded successfully",
        user,
        statusCode: 200
    })
});


//update profile
let updateProfile = catchAsync(async (req, res, next) => {
    let { name, email,avatar } = req.body;
    let user = await userSch.findById(req.user.id);
    let userWithSameMail = await userSch.findOne({email});

    if (!user) {
        return next(new ErrorHandler('user not found please login', 401))

    }
    if (userWithSameMail) {
        if (user.email !==userWithSameMail.email) {
            // console.log(userWithSameMail.email);
            return next(new ErrorHandler('email already excit', 401))
        }

    }

    // console.log(avatar);
   
    if (avatar != "") {
// url of image that alreadr saved in database
        
        await cloudinary.v2.uploader.destroy(user.avatar[0].public_id)
        let fileUploaded = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatar",
            width:200,
            crop: "scale"
        })
        user.avatar[0].public_id=fileUploaded.public_id
        user.avatar[0].url=fileUploaded.url
        
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save()
    sendCookies(res, user, "profile updated successfully")

});

//get all users
let allusers = catchAsync(async (req, res, next) => {

    let users = await userSch.find();

    sendResponce(res, 200, {
        acknowledge: true,
        sms: "users founded successfully",
        users
    })
});

//update a user role admin only can do this
let updateUser = catchAsync(async (req, res, next) => {
    let { id } = req.params;
    let { name, email, role } = req.body;
    let user = await userSch.findById(id);
    if (!user) {
        return next(new ErrorHandler('user not found please login', 401))

    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save()
    res.send({
        user,
        sms:"user updated successfully",
        
    })
    // sendCookies(res, user, "user updated successfully")

});

//get single user detail
let getUserDetail = catchAsync(async (req, res, next) => {
    let { id } = req.params;

    let user = await userSch.findById(id);
    if (!user) {
        return next(new ErrorHandler('user not found please login', 401))
    }
    sendResponce(res, 200, {
        acknowledge: true,
        sms: "user founded successfully",
        user
    })

});

//delete user only admin can
let deleteUser = catchAsync(async (req, res, next) => {
    let { id } = req.params;

    let user = await userSch.findById(id);
    if (!user) {
        return next(new ErrorHandler('user not found ', 401))
    }
    await cloudinary.v2.uploader.destroy(user.avatar[0].public_id);
    await user.deleteOne();
    sendResponce(res, 200, {
        acknowledge: true,
        sms: "user deleted successfully",
        user
    })

});
module.exports = { registerUser, login, forgetpassword, resetpassword, allusers, deleteUser, updateProfile, getUserDetail, updatePassword, logout, profile, updateUser };