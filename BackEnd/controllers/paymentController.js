let catchAsync = require("../middleware/catchAsycn");
const ErrorHandler = require("../utils/errorHandler");
const stripe = require('stripe')('sk_test_51NVwUoJgOtYazrBpMu99BFrudwCrBXZBNkCUG29vqPeqbCFS5wYm6kR3jUPEhwajI17Lk7fjKtH14y2Bp4lO5kB200h5g04rzL');
exports.processPayment=catchAsync(async (req,res,next)=>{
  let {amount}=req.body;
  // console.log(parseInt(amount));
  
try {
    

const paymentIntent = await stripe.paymentIntents.create({
    amount:parseInt(amount*100),
 
    currency: 'inr',
    metadata:{
        store:"storeZ"
    }
    
  });
    
    res.status(200).send({success:true,client_secret:paymentIntent.client_secret})

} catch (error) {
  console.log(error);
 return  next(new ErrorHandler('somethng went wrong please make sure you are connected to internet and not using vpn', 400))
}

});

// use tom send secret key to fronent on request
exports.stripeKeySend=(req,res)=>{
res.status(200).send({stripeApiKey:process.env.STRIPE_API_KEY})
}