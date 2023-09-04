let express=require('express');
const {registerUser, login,forgetpassword, resetpassword,updatePassword,updateUser,getUserDetail,logout,updateProfile,deleteUser, profile,allusers} = require('../controllers/userController');
const {isAuthentic, isAdmin} = require('../middleware/isAuthentic');
let userRoute=express.Router();


 
userRoute.route('/register').post(registerUser)
userRoute.route('/login').post(login)
userRoute.route('/logout').get(isAuthentic,logout)

userRoute.route('/password/forget').post(forgetpassword)
userRoute.route('/password/reset/:token').post(resetpassword);

userRoute.route('/password/update').post(isAuthentic,updatePassword)
userRoute.route('/me').get(isAuthentic, profile)
userRoute.route('/me/update').post(isAuthentic, updateProfile)
userRoute.route('/admin/alluser').get(isAuthentic,isAdmin, allusers)
userRoute.route('/admin/user/:id').get(isAuthentic,isAdmin, getUserDetail).put(isAuthentic,isAdmin, updateUser).delete(isAuthentic,isAdmin, deleteUser)

module.exports=userRoute;

