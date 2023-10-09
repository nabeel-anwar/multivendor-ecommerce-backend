const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
            },
            quantity: Number,
            price: Number,
        }
    ],
    status: String,
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

module.exports = mongoose.model('Cart', cartSchema);