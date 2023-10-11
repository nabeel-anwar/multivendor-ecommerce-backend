const express = require('express');
const orderController = require('./../controllers/orderController');


const orderRouter = express.Router();

orderRouter
    .route('/')
    .get(orderController.getOrders)
    .post(orderController.createOrder);

orderRouter
    .route('/:id')
    .get(orderController.getOrder)
    .patch(orderController.updateOrder)
    .delete(orderController.deleteOrder);

module.exports = orderRouter;