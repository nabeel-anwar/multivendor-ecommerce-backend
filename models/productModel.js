const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    extraDescription: String,
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    totalAllowedQuantity: {
        type: Number,
        default: null, // Set a value if there's a limit; otherwise, use null or undefined
    },
    minOrderQuantity: {
        type: Number,
        default: null, // Set a value if there's a limit; otherwise, use null or undefined
    },
    maxOrderQuantity: {
        type: Number,
        default: null, // Set a value if there's a limit; otherwise, use null or undefined
    },
    images: [String], // An array of image URLs
    attributes: [{
        name: String,
        value: String,
    }],
    tags: [String],
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    ratingsAverage: {
        type: Number,
        default: 0,
    },
    isReturnable: {
        type: Boolean,
        required: true,
    },
    isCancelable: {
        type: Boolean,
        required: true,
    },
    SKU: String,
    UPC: String,
    variants: [{
        name: String, // e.g., 'size', 'color'
        value: String, // e.g., 'XL', 'Red'
    }],
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
    },
    slug: String,
    isCodAllowed: Boolean,
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

module.exports = mongoose.model('Product', productSchema);
