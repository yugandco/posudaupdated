const mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
    img: String,
    title: String,
    description: String,
    price: Number,
    hasQty: Number,
    sale: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    inCart: [{
        id: String,
        status: {
            type: Boolean,
            default: false
        },
        date: Date
    }],
    inBuy: [{
        id: String,
        status: {
            type: Boolean,
            default: false
        },
        date: Date,
        qty: Number,
        sum: Number
    }]
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product