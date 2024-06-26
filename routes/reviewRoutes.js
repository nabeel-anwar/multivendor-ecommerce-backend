const express = require('express');
const reviewController = require('./../controllers/reviewController');

const reviewRouter = express.Router();

reviewRouter.get('/filter', reviewController.searchReview);

reviewRouter
    .route('/')
    .get(reviewController.getReviews)
    .post(reviewController.createReview);

reviewRouter
    .route('/:id')
    .get(reviewController.getReview)
    .patch(reviewController.updateReview)
    .delete(reviewController.deleteReview);

module.exports = reviewRouter;