const Order = require('./../models/orderModel');
const Factory = require('./handlerFactory');

exports.createOrder = Factory.createOne(Order);

exports.getOrders = Factory.getAll(Order);

exports.getOrder = Factory.getOne(Order);

exports.updateOrder = Factory.updateOne(Order);

exports.deleteOrder = Factory.deleteOne(Order);