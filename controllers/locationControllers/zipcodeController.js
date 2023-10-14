const Zipcode = require('../../models/zipcodeModel');
const Factory = require('../handlerFactory');

exports.searchZipcode = Factory.search(Zipcode, ['code']);

exports.createZipcode = Factory.createOne(Zipcode);

exports.getZipcodes = Factory.getAll(Zipcode);

exports.getZipcode = Factory.getOne(Zipcode);

exports.updateZipcode = Factory.updateOne(Zipcode);

exports.deleteZipcode = Factory.deleteOne(Zipcode);