let express=require('express');
const {allProducts, getDetail, updateProduct,getReviews, deleteProduct, addNewProduct, addReview, deleteReview, AdminGetAllProducts } = require('../controllers/productController');
const {isAuthentic,isAdmin} = require('../middleware/isAuthentic');

let productRoute=express.Router();
productRoute.use(isAuthentic)
productRoute.route('/').get(allProducts);
productRoute.route('/product/:id').get(getDetail);
// productRoute.route('/reviews').get(getReviews);
productRoute.route('/review').post(addReview).delete(deleteReview);

//admin pages
productRoute.route('/admin/new').post(isAdmin,addNewProduct)
productRoute.route('/admin/products').get(isAdmin,AdminGetAllProducts)
productRoute.route('/admin/:id').put(isAdmin,updateProduct).delete(isAdmin,deleteProduct)





module.exports=productRoute;