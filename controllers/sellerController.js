const Seller = require('./../models/sellerModel');
const Factory = require('./../controllers/handlerFactory');

exports.searchSeller = Factory.search(Seller, ['storeName']);

exports.getSeller = Factory.getOne(Seller, {path: 'reviews', select: 'review rating images user product -seller'});

exports.getSellers = Factory.getAll(Seller);

exports.createSeller = Factory.createOne(Seller);
