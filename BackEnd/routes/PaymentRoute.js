let express=require('express');

const { processPayment, stripeKeySend } = require('../controllers/paymentController');
const { isAuthentic } = require('../middleware/isAuthentic');
let paymentRoute=express.Router();

paymentRoute.route("/").post(isAuthentic,processPayment)
paymentRoute.route("/stripekey").get(isAuthentic,stripeKeySend)

module.exports=paymentRoute;
