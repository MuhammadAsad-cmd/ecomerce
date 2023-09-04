let productSch = require('../models/productSch')
let catchAsync = require('../middleware/catchAsycn');
const ErrorHandler = require('../utils/errorHandler');
const sendResponce = require('../utils/responceSendFun');
let cloudinary = require('cloudinary')

//find all product user and admin both can access it
let allProducts = catchAsync(async (req, res, next) => {
    let limitProduct=8;
    let skipProduct = ((req.query.page || 1) - 1) * limitProduct;
    let greaterPrice = req.query.gte || 0;
    let lessPrice = req.query.lte || 100000;
    let pName = req.query.name;
    let catagory = req.query.catagory;

    let rating = { $gte: req.query.ratingGte || 0, $lte: req.query.ratingLte || 5 };
    // console.log(rating);
    let products;
    
    let productCount;
    if (!pName && !catagory) {
        //count product
        productCount = await productSch.find({'$and': [{ price: { $gte: parseInt(greaterPrice), $lte: parseInt(lessPrice) } },{ rating }]}).countDocuments();
//products
        products = await productSch.find({
            '$and': [
                { price: { $gte: parseInt(greaterPrice), $lte: parseInt(lessPrice) } },
                { rating }

            ]

        }).limit(limitProduct).skip(skipProduct);
        // console.log(rating);
    } else {


        if (catagory) {
            //count products
            productCount = await productSch.find({'$and': [{ price: { $gte: parseInt(greaterPrice), $lte: parseInt(lessPrice) } },{ rating }, { catagory }]}).countDocuments();

            //products
            products = await productSch.find({
                '$and': [
                    { price: { $gte: greaterPrice, $lte: lessPrice } },
                    { rating },
                    { catagory }
                ]

            }).limit(limitProduct).skip(skipProduct);
        } else {

//count produsts
productCount = await productSch.find({'$and': [{ price: { $gte: parseInt(greaterPrice), $lte: parseInt(lessPrice) } },{ rating }, { name: { '$regex': pName } }]}).countDocuments();
//products
            products = await productSch.find({
                '$and': [
                    { price: { $gte: greaterPrice, $lte: lessPrice } },
                    { rating },
                    { name: { '$regex': pName } }

                ]

            }).limit(limitProduct).skip(skipProduct);
        }
    }

    let sms = "founded";
    // return next(new ErrorHandler("my error",400))
    sendResponce(res, 200, { acknowledge: true, sms ,productCount,limitProduct,products}) ;
});
// get all products by admin
let AdminGetAllProducts= catchAsync(async (req,res,next)=>{
    let products = await productSch.find();
    if (!products) {
        return next(new ErrorHandler(400,'products not found'))
        
    }
    let sms = "founded";

    sendResponce(res, 200, { acknowledge: true, sms, products })

})
let getDetail = catchAsync(async (req, res, next) => {

    let product = await productSch.findById(req.params.id);
    if (!product) {

        return next(new ErrorHandler('product not found', 404))
    }
    let sms = "founded";

    sendResponce(res, 200, { acknowledge: true, sms, product })

});
//update product
let updateProduct = catchAsync(async (req, res, next) => {
    let product = await productSch.findById(req.params.id);
    let newproduct;
    if (!product) {

        return next(new ErrorHandler('product not found', 404))
    };
    // console.log(req.body?.images);
    if (req.body.images != undefined) {
        let uploadedImgs=[]
        if (typeof req.body.images =='string') {
            uploadedImgs.push(req.body.images)
        }else{
            uploadedImgs=req.body.images
        }
    console.log(typeof req.body.images);
    for (let i = 0; i < product.image.length; i++) {
        await cloudinary.v2.uploader.destroy(product.image[i].public_id)
        
    }
    let cloudinaryProductsUlr=[]
    for (let i = 0; i < uploadedImgs.length; i++) {
        const result = await cloudinary.v2.uploader.upload(req.body.images[i], {
           
            folder: "StoreZProducts",
            
            width:200,
            crop: "scale"
        });
    
        cloudinaryProductsUlr.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

req.body.image=cloudinaryProductsUlr;
 newproduct = await productSch.findByIdAndUpdate(req.params.id, req.body);
    }else{
 newproduct = await productSch.findByIdAndUpdate(req.params.id, req.body);
console.log(req.body.image);
    }

    let sms = "successfully updated"
    sendResponce(res, 200, { acknowledge: true, sms, newproduct })


});
//delete product
let deleteProduct = catchAsync(async (req, res, next) => {
    let product = await productSch.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('product not found', 404))

    }
    for (let i = 0; i < product.image.length; i++) {
        
        
        await cloudinary.v2.uploader.destroy(product.image[i].public_id)
    }
    await product.deleteOne();
    let sms = 'deleted successfully';
    sendResponce(res, 200, { acknowledge: true, sms, product })


});


//add new product
let addNewProduct = catchAsync(async (req, res, next) => {
    let {images} = req.body;

    let productImges=[];
   
    let cloudinaryProductsUlr=[]
   if(typeof images ==='string'){
    productImges.push(images)
   }else{
    productImges=images
   }
   try {
    // productImges.forEach(async(i)=>{
    //     let fileUploaded = await cloudinary.v2.uploader.upload(i, {
    //         folder: "StoreZProducts",
    //         width:200,
    //         crop: "scale"
    //     })
    //     cloudinaryProductsUlr.push({
            
    //             public_id: fileUploaded.public_id,
    //             url: fileUploaded.secure_url
               
            
    //     })
    
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "StoreZProducts",
                width:200,
                crop: "scale"
            });
        
            cloudinaryProductsUlr.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
    req.body.image=cloudinaryProductsUlr
        // console.log(productImges);
        let newproduct = await productSch.create({ user: req.user.id, ...req.body });
        let sms = 'created successfully';
        sendResponce(res, 200, { acknowledge: true, sms, newproduct })
    // });
   } catch (error) {
    return next(new ErrorHandler('image not uploaded', 400))
   }


})

let getReviews = catchAsync(async (req, res, next) => {
    //product id must be provided

    let product = await productSch.findById(req.query.id);
    if (!product) {

        return next(new ErrorHandler('product not found', 404))
    }
    let sms = "all reviews";

    sendResponce(res, 200, { acknowledge: true, sms, reviews: product.reviews })
});

//add  review
let addReview = catchAsync(async (req, res, next) => {
    let { comment, rating, productId } = req.body;
    let { id, name } = req.user
    let sms;
    let product = await productSch.findById(productId);
    if (!product) {

        return next(new ErrorHandler('product not found', 404))
    };

    let isReviewd = product.reviews.find((e) => {
        return e.user == req.user.id;

    });

    if (isReviewd) {
        sms = "review updated";

        isReviewd.comment = comment;
        isReviewd.rating = rating;

    } else {
        sms = "review added";

        product.reviews.push({
            name,
            comment,
            rating,
            user: id
        })

        product.numOfReview = product.reviews.length
    }
    let avg = 0;
    product.reviews.forEach((r) => {
        avg += r.rating;
    });
    product.rating = parseInt(avg / product.numOfReview)


    await product.save();

    sendResponce(res, 200, { acknowledge: true, sms, review: isReviewd || product.reviews[product.reviews.length - 1] })
});

//delete review
let deleteReview = catchAsync(async (req, res, next) => {
    let { productId, id } = req.query;
    console.log(req.query);
    let product = await productSch.findById(productId);
    if (!product) {
        return next(new ErrorHandler('product not found', 404))
    }
    let isReviewd = product.reviews.some((e) => { return e.id == id });

    if (!isReviewd) {
        return next(new ErrorHandler('review not found', 404))

    };
    let remaingReviews = product.reviews.filter((e) => {
        return e.id != id
    });
    product.numOfReview = remaingReviews.length
    let avg = 0;
    remaingReviews.forEach((r) => {
        avg += r.rating;
    })
    // console.log(remaingReviews.length/avg);
    //beloww line will create an issue product has a single review and any user delete
    //it and its rating become NaN due to 0/0 
    product.rating = parseInt(avg / remaingReviews.length) || 0
    product.reviews = remaingReviews
    await product.save();
    let sms = 'review deleted successfully'
    sendResponce(res, 200, { acknowledge: true, sms,product })

})
module.exports = { allProducts,AdminGetAllProducts, getReviews, getDetail, updateProduct, deleteProduct, addNewProduct, addReview, deleteReview }