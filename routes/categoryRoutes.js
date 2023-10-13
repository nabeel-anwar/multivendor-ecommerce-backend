const express = require('express');
const categoryController = require('./../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.get('/filter', categoryController.searchCategories);

categoryRouter
    .route('/')
    .get(categoryController.getCategories)
    .post(categoryController.createCategory);


categoryRouter
    .route('/:id')
    .get(categoryController.getCategory)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

module.exports = categoryRouter;