const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    state: {
        type: mongoose.Schema.ObjectId,
        ref: 'State',
        required: true
    }
});

module.exports = mongoose.model('City', citySchema);
