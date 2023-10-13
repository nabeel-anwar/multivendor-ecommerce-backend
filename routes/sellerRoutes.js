const express = require('express');
const sellerController = require('./../controllers/sellerController');

const sellerRouter = express.Router();

sellerRouter.get('/filter', sellerController.searchSeller);

sellerRouter
    .route('/')
    .get(sellerController.getSellers)
    .post(sellerController.createSeller);

sellerRouter
    .route('/:id')
    .get(sellerController.getSeller);

module.exports = sellerRouter;