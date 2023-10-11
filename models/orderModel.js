const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // Reference to the user who placed the order
        required: true,
    },
    address: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address', // Reference to the shipping address
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    deliveryCharges: {
        type: Number,
        required: true,
    },
    promoCode: String,
    promoDiscount: Number,
    finalTotal: {
        type: Number,
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product', // Reference to the product in the order
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    notes: String,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'canceled'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'credit_card', 'bank_transfer'],
        required: true
        // Add more payment-related fields as needed
    },
    shippingTracking: {
        type:{
            carrier: String,
            trackingNumber: String,
        }
    },
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

orderSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'items.product',
        select: 'title price'
    });
    next();
})

module.exports = mongoose.model('Order', orderSchema);