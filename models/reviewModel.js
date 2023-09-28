const mongoose = require('mongoose');
const Product = require('./productModel');
const Seller = require('./sellerModel')

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    images: [String],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'Seller',
    } // Get Seller id from product & calculate seller ratings and seller ratingsAverage
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
reviewSchema.pre('save', async function(next){
    const product = await Product.findById(this.product);
    this.seller = product.seller;
});

module.exports = mongoose.model('Review', reviewSchema);