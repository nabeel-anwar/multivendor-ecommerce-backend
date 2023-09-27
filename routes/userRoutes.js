const express = require('express');
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter
    .route('/')
    .get(userController.getAllUser)
    .post(userController.createUser);

userRouter
    .route('/:id')
    .patch(userController.updateMe);

module.exports = userRouter;