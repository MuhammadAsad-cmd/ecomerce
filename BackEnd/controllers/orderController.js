const catchAsync = require("../middleware/catchAsycn");
const orderSch = require("../models/orderSch");
const productSch = require("../models/productSch");
const ErrorHandler = require("../utils/errorHandler");
const sendResponce = require("../utils/responceSendFun");

//create new order
let newOrder = catchAsync(async (req, res) => {
// console.log(req.body);
    let order = await orderSch.create({ user: req.user.id, ...req.body });

    sendResponce(res, 200, {
        acknowledge: true,
        sms: "order created successfully",
        order
    })
});

//update order
let updateOrder = catchAsync(async (req, res, next) => {
    let { orderStatus } = req.body
    let order = await orderSch.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler('order not found', 401))
    }
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('you already delivered the order', 401))

    }
    order.orderStatus = orderStatus || order.orderStatus;
    if (order.orderStatus === 'Delivered') {
        order.deliveredAt = Date.now();
    
    

    order.orderItems.forEach(async (p) => {
        await updateStock(p, p.quentity);

    })
}
    await order.save()
    sendResponce(res, 200, {
        acknowledge: true,
        sms: "order updated successfully",
        order
    })
});

async function updateStock(p, q) {
try{
    let product = await productSch.findById(p.productId);
    console.log(product);

    product.stock -= q;
    await product.save();
}catch(err){
console.log("product stock not updated",err);
}
};

// find all order of single user
let myOrders=catchAsync(async (req,res,next)=>{
    let myOrders=await orderSch.find({user:req.user._id});
    if (!myOrders) {
        return next(new ErrorHandler('order not found',401))
        
    };
    sendResponce(res, 200, {
        acknowledge: true,
        sms: "your all orders",
        orders:myOrders
    })
})

//ADMIN get all order
let getAllOrders=catchAsync(async (req,res,next)=>{
    let allOrders=await orderSch.find();
    if (!allOrders) {
        return next(new ErrorHandler('order not found',401))
        
    };
    sendResponce(res, 200, {
        acknowledge: true,
        sms: "your all orders",
        orders:allOrders
    })
})
//delete an order
let deleteOrder=catchAsync(async(req,res,next)=>{
let order=await orderSch.findById(req.params.id)

if (!order) {
    return next(new ErrorHandler('order not found',401))
    
};
if (order.orderStatus ==='Delivered') {
    return next(new ErrorHandler('order has been delivered',401))
    
}
await order.deleteOne();
sendResponce(res, 200, {
    acknowledge: true,
    sms: "order deleted successfully",
    order
})

})


//get single order detail
let singeOrderDetail=catchAsync(async (req,res,next)=>{
    let order=await orderSch.findById(req.params.id).populate('user');
    if (!order) {
        return next(new ErrorHandler('order not found',401))
        
    };
    sendResponce(res, 200, {
        acknowledge: true,
        order
    })
})
module.exports = {
    newOrder, updateOrder,deleteOrder,myOrders,getAllOrders,singeOrderDetail
}