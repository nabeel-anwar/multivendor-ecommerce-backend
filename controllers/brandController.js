const Brand = require('./../models/brandModel');
const Factory = require('./handlerFactory');

exports.getBrands = Factory.getAll(Brand);

exports.getBrand = Factory.getOne(Brand);

exports.createBrand = Factory.createOne(Brand);

exports.updateBrand = Factory.updateOne(Brand);

exports.deleteBrand = Factory.deleteOne(Brand);