const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parentCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category', // Reference to the parent category
    },
    image: String, // URL or file path for category image
    description: String,
}, {
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

module.exports = mongoose.model('Category', categorySchema);
