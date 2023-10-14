const Address = require('../../models/locations/addressModel');
const Factory = require('../handlerFactory');

exports.getAddresses = Factory.getAll(Address);

exports.getAddress = Factory.getOne(Address);

exports.createAddress = Factory.createOne(Address);

exports.updateAddress = Factory.updateOne(Address);

exports.deleteAddress = Factory.deleteOne(Address);