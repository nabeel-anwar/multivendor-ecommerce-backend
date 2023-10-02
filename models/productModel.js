const mongoose = require('mongoose');
const slugify = require('slugify');

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
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    slug: String,
    isCodAllowed: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

productSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});


module.exports = mongoose.model('Product', productSchema);
