const mongoose = require('mongoose');
const User = require('./userModel');

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
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

// update the address to user addresses array whenever new address is created.
addressSchema.post('save', async function (doc, next) {
    try {
        await User.findByIdAndUpdate(
            doc.userId,
            {
                $push: {addresses: doc._id}
            }
        )

        next();
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
})

addressSchema.post('findOneAndDelete', async function (doc, next) {
    try {
        // Remove the addressId from the user's addresses array
        await User.findByIdAndUpdate(
            doc.userId,
            {
                $pull: {addresses: doc._id}
            }
        );
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Address', addressSchema);