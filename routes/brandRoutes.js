const express = require('express');
const brandController = require('./../controllers/brandController');

const brandRouter = express.Router();

brandRouter.get('/filter', brandController.searchBrand);

brandRouter
    .route('/')
    .get(brandController.getBrands)
    .post(brandController.createBrand);

brandRouter
    .route('/:id')
    .get(brandController.getBrand)
    .patch(brandController.updateBrand)
    .delete(brandController.deleteBrand);

module.exports = brandRouter;