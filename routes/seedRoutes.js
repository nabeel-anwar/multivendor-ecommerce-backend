const express = require('express');
const seedController = require('./../controllers/seedController')

const seedRouter = express.Router();

seedRouter.get('/users', seedController.seedUser);
seedRouter.get('/sellers', seedController.seedSeller);
seedRouter.get('/categories', seedController.seedCategories);
seedRouter.get('/brands', seedController.seedBrands);

module.exports = seedRouter;