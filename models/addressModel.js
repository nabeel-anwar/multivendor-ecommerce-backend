const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Residential', 'Business'],
        required: [true, 'Address type must be either "Residential" or "Business".'],
    },
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

module.exports = mongoose.model('Address', addressSchema);