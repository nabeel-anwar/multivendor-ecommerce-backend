const express = require('express');
const productController = require('./../controllers/productController');

const productRouter = express.Router();

productRouter.get('/filter', productController.searchProduct);

productRouter
    .route('/')
    .get(productController.getProducts)
    .post(productController.createProduct);

productRouter
    .route('/:id')
    .get(productController.getProduct)
    .patch(productController.updateProduct);

module.exports = productRouter;