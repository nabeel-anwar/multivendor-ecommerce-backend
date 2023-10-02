const Category = require('./../models/categoryModel');
const Factory = require('./handlerFactory');

exports.getCategories = Factory.getAll(Category);

exports.getCategory = Factory.getOne(Category);

exports.createCategory = Factory.createOne(Category);

exports.updateCategory = Factory.updateOne(Category);

exports.deleteCategory = Factory.deleteOne(Category);