const mongoose = require('mongoose');
const User = require('./userModel');

const sellerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user associated with the seller
        required: true,
        unique: true,
    },
    storeName: {
        type: String,
        unique: true,
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
        unique: true,
    },

    // Required files to approve seller
    cnic: {
        type: String,
        required: true,
    }, // URL or file path for the CNIC (image)
    ProofOfAddress: {
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

sellerSchema.post('save', async function (next) {
    try {
        await User.findByIdAndUpdate(
            this.userId,
            {
                role: 'vendor'
            },
            {
                new: true,
                runValidators: true,
            }
        );
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
});

module.exports = mongoose.model('Seller', sellerSchema);
