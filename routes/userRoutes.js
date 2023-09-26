const express = require('express');
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter
    .route('/')
    .get(userController.getAllUser)
    .post(userController.createUser);

module.exports = userRouter;