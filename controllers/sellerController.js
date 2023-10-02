const Seller = require('./../models/sellerModel');
const Factory = require('./../controllers/handlerFactory');

exports.getSeller = Factory.getOne(Seller);

exports.getSellers = Factory.getAll(Seller);

exports.createSeller = Factory.createOne(Seller);
