const express = require('express');
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get('/filter', userController.searchUser);

userRouter
    .route('/')
    .get(userController.getAllUser)
    .post(userController.createUser);

userRouter
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateMe)
    .delete(userController.deleteMe);

module.exports = userRouter;