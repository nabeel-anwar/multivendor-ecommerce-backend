const Product = require('./../models/productModel');
const Factory = require('./handlerFactory');

exports.getProducts = Factory.getAll(Product);

exports.getProduct = Factory.getOne(Product, {path: 'reviews', select: 'review rating images user seller'});

exports.createProduct = Factory.createOne(Product);

exports.updateProduct = Factory.updateOne(Product);