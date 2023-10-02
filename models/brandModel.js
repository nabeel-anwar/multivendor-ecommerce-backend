const mongoose = require('mongoose');
const slugify = require('slugify');

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
        select: false,
    }
}, {
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});


brandSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Brand', brandSchema);