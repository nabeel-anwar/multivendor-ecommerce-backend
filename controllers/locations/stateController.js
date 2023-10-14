const State = require('../../models/stateModel');
const Factory = require('../handlerFactory');


exports.searchState = Factory.search(State, ['name']);

exports.createState = Factory.createOne(State);

exports.getStates = Factory.getAll(State);

exports.getState = Factory.getOne(State);

exports.updateState = Factory.updateOne(State);

exports.deleteState = Factory.deleteOne(State);