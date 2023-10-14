const Area = require('../../models/areaModel');
const Factory = require('./../handlerFactory');


exports.searchArea = Factory.search(Area, ['name', 'deliveryCharge', 'minimumOrderAmount']);

exports.createArea = Factory.createOne(Area);

exports.getAreas = Factory.getAll(Area);

exports.getArea = Factory.getOne(Area);

exports.updateArea = Factory.updateOne(Area);

exports.deleteArea = Factory.deleteOne(Area);