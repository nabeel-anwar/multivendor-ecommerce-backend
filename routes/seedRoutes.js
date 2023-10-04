const express = require('express');
const seedController = require('./../controllers/seedController')

const seedRouter = express.Router();

seedRouter.get('/users', seedController.seedUser);
seedRouter.get('/sellers', seedController.seedSeller);
seedRouter.get('/categories', seedController.seedCategories);
seedRouter.get('/brands', seedController.seedBrands);
seedRouter.get('/products', seedController.seedProduct);
seedRouter.get('/reviews', seedController.seedReviews);
seedRouter
    .get(
        '/collections',
        seedController.seedUser,
        seedController.seedSeller,
        seedController.seedCategories,
        seedController.seedBrands,
        seedController.seedProduct,
        seedController.seedReviews
    );

module.exports = seedRouter;