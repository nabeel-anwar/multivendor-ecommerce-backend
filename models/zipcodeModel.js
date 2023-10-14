const mongoose = require('mongoose');

const zipcodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

module.exports = mongoose.model('Zipcode', zipcodeSchema);
