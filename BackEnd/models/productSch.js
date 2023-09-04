let mongoose = require('mongoose');
let productSch = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,

        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 1
    },
    catagory: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    numOfReview: {
        type: Number,
        default: 0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
           url:{
                type:String,
                required:true
            }
        }
    ],
    reviews: [{
        name: {
            type: String,
        },
        rating: {
            type: Number,
            default: 0
        },
        comment: {
            type: String,

        },
        user: {
            type: mongoose.Schema.ObjectId
        }


    }],
    user: {
        type: mongoose.Schema.ObjectId,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});
module.exports = mongoose.model('products',productSch)