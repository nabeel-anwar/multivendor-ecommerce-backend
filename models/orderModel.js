const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // Reference to the user who placed the order
        required: true,
    },
    addressId: {
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
            productId: {
                type: mongoose.Schema.Types.ObjectId,
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
    paymentInformation: {
        method: String,
        // Add more payment-related fields as needed
    },
    shippingTracking: {
        carrier: String,
        trackingNumber: String,
    },
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

module.exports = mongoose.model('Order', orderSchema);