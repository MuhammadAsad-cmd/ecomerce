const ErrorHandler = require("../utils/errorHandler");

let errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error"

    //invalid id
    if (err.name == 'CastError') {
        err = new ErrorHandler('invalid reffernce or id', 401)
    };
    //duplication of email
    if (err.code == 11000) {
        err = new ErrorHandler("Email already excit please try with another", 401)
    }

    //JsonWebTokenError
    if (err.name == "JsonWebTokenError") {
        err = new ErrorHandler('your token is invalid or has been expired', 401)
    }
    //token has been expires
    if (err.name == 'TokenExpiredError') {
        err = new ErrorHandler('token has been expired', 400)
        // throw err

    };
    res.status(err.statusCode).send({
        acknowledge: false,
        sms: err.message
    })

}
module.exports = errorMiddleware