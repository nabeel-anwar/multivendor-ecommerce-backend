const mongoose = require('mongoose');
const Product = require('./productModel');
const Seller = require('./sellerModel')

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    images: [String],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'Seller',
    } // Get Seller id from product & calculate seller ratings and seller ratingsAverage
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
reviewSchema.pre('save', async function(next){
    const product = await Product.findById(this.product);
    this.seller = product.seller;
});

reviewSchema.statics.calcProductAvgRating = async function(productId) {
    try{
        const stats = await this.aggregate([
            {
             $match: {product: productId}
            },
            {
                $group: {
                    _id: '$product',
                    nRating: { $sum: 1 },
                    avgRating: { $avg: '$rating' }
                }
            }
        ]);

        //console.log(stats);

        if(stats.length > 0){
            await Product.findByIdAndUpdate(productId, {
                ratingsQuantity: stats[0].nRating,
                ratingsAverage: stats[0].avgRating
            })
        }
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
}

reviewSchema.statics.calcSellerAvgRating = async function(sellerId) {
    try{
        const stats = await this.aggregate([
            {
                $match: {seller: sellerId}
            },
            {
                $group: {
                    _id: '$seller',
                    nRating: { $sum: 1 },
                    avgRating: { $avg: '$rating' }
                }
            }
        ]);

        console.log(stats);

        if(stats.length > 0){
            await Seller.findByIdAndUpdate(sellerId, {
                ratingsQuantity: stats[0].nRating,
                ratingsAverage: stats[0].avgRating
            })
        }
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
}

reviewSchema.post('save', async function(){
    // this points to current review document
    await this.constructor.calcProductAvgRating(this.product);
    await this.constructor.calcSellerAvgRating(this.seller);
})


module.exports = mongoose.model('Review', reviewSchema);