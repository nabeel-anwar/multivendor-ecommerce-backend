const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

module.exports = mongoose.model('Order', orderSchema);