const City = require('../../models/locations/cityModel');
const Factory = require('../handlerFactory');


exports.searchCity = Factory.search(City, ['name']);

exports.createCity = Factory.createOne(City);

exports.getCities = Factory.getAll(City);

exports.getCity = Factory.getOne(City);

exports.updateCity = Factory.updateOne(City);

exports.deleteCity = Factory.deleteOne(City);