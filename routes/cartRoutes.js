const express = require('express');
const cartController = require('./../controllers/cartController');

const cartRouter = express.Router();

cartRouter.post('/add', cartController.addItemToCart);

module.exports = cartRouter;