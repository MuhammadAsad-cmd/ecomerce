let mongoose = require('mongoose');
let orderSch = new mongoose.Schema({

    shipingInfo: {
        address: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
            default: "Pakistan"
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        phNO: {
            type: Number,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        }

    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            quentity: {
                type: Number,
                requried: true
            },
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: 'products',
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paidAt: {
        type: Date,
        required: true
    },
    itemsPrice: {
        type: Number,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true
    },
    shipingPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        default: 'Processing',
        required: true
    },
    deliveredAt: Date,

    createdAt:{
     type:Date,
     default:Date.now()   
    }

});
module.exports = mongoose.model('orders', orderSch)