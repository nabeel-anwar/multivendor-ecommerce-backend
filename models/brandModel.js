const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    slug:String,
    logo: {
        type: String,
        required: true,
    },
    website: String,
    active: {
        type: Boolean,
        default: true,
    }
}, {
    timeStamp: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
})

module.exports = mongoose.model('Brand', brandSchema);