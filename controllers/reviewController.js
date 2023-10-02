const Review = require('./../models/reviewModel');
const Factory = require('./handlerFactory');

exports.getReviews = Factory.getAll(Review);

exports.getReview = Factory.getOne(Review);

exports.createReview = Factory.createOne(Review);

exports.updateReview = Factory.updateOne(Review);

exports.deleteReview = Factory.deleteOne(Review);