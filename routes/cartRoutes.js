const express = require('express');
const cartController = require('./../controllers/cartController');

const cartRouter = express.Router();

cartRouter
    .route('/')
    .get(cartController.getCarts);

cartRouter
    .route('/:id')
    .get(cartController.getCart)
    .delete(cartController.deleteCart);

cartRouter.post('/add', cartController.addItemToCart); // Add item to cart and update quantity if same item is added.
cartRouter.post('/remove', cartController.removeItemFromCart); // Remove the item from cart

module.exports = cartRouter;