const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user associated with the seller
        required: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    storeDescription: String,
    logo: {
        type: String,
        required: true,
    }, // URL or file path for the seller's logo
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    ratingsAverage: {
        type: Number,
        default: 0,
    },

    // Account Details
    bankName: {
        type: String,
        required: true,
    },
    bankCode: {
        type: String,
        required: true,
    },
    accountTitle: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },

    // Required files to approve seller
    cnic: {
        type: String,
        required: true,
    }, // URL or file path for the CNIC (image)
    addressOfProof: {
        type: String,
        required: true,
    }, // URL or file path for address proof (image)
    signature: {
        type: String,
        required: true,
    }, // URL or file path for the seller's signature (image)

    status: {
       type: Boolean,
       default: false,
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

module.exports = mongoose.model('Seller', sellerSchema);
