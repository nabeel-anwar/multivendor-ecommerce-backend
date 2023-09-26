const factory = require('./handlerFactory');
const User = require('./../models/userModel');

exports.getAllUser = factory.getAll(User);

exports.createUser = factory.createOne(User);