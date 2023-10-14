const mongoose = require('mongoose');

const areasSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: mongoose.Schema.ObjectId,
        ref: 'State',
        required: true
    },
    city: {
        type: mongoose.Schema.ObjectId,
        ref: 'City',
        required: true,
    },
    zipCode: {
        type: mongoose.Schema.ObjectId,
        ref: 'Zipcode',
        required: true,
    },
    deliveryCharge: {
        type: Number,
        required: true
    },
    minimumFreeDeliveryAmount: Number,
    coverage: {
        type: Boolean,
        default: true,
    },
    minimumOrderAmount: Number,

},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

module.exports = mongoose.model('Area', areasSchema);
