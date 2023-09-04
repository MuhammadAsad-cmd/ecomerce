let jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const userSch = require('../models/userSch');
let isAuthentic = async (req, res, next) => {
    let { token } = req.cookies;
    // console.log(token);
    // console.log(req.route);
    if (!token) {
        return next(new ErrorHandler('please login first to access the page', 401))

    }

    let verify = await jwt.verify(token, process.env.JWT_KEY);
    let user = await userSch.findById(verify.id);
    if (!user) {
        return next(new ErrorHandler('user not found please register yourself', 404))

    }
    req.user = user;
    next()

}
let isAdmin=async (req,res,next)=>{
    let { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler('please login first to access the page', 401))

    }

    let verify = await jwt.verify(token, process.env.JWT_KEY);
    let user = await userSch.findById(verify.id);
    if (!user) {
        return next(new ErrorHandler('user not found please register yourself', 404))

    }
    if (user.role !=="admin") {
        return next(new ErrorHandler('only admin can access this page', 401))
        
    }
    next()
}
module.exports = {isAuthentic,isAdmin};