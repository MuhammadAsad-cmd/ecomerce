let express=require('express');
const { newOrder, updateOrder,deleteOrder,myOrders,getAllOrders,singeOrderDetail } = require('../controllers/orderController');
const { isAuthentic, isAdmin } = require('../middleware/isAuthentic');
let orderRoute=express.Router();

orderRoute.route('/new').post(isAuthentic,newOrder);
orderRoute.route('/me/orders').get(isAuthentic,myOrders);
orderRoute.route('/:id').get(isAuthentic,singeOrderDetail);


orderRoute.route('/admin/orders').get(isAuthentic,isAdmin,getAllOrders);
orderRoute.route('/admin/:id').post(isAuthentic,isAdmin,updateOrder).delete(isAuthentic,isAdmin,deleteOrder);;


module.exports=orderRoute