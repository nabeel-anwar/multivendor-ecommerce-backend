const express = require('express');
const userController = require("../controllers/userController");
const {multerUpload} = require("../utils/fileHandler");

const userRouter = express.Router();

userRouter.get('/filter', userController.searchUser);

userRouter
    .route('/')
    .get(userController.getAllUser)
    .post(userController.createUser);

userRouter
    .route('/:id')
    .get(userController.getUser)
    .patch(multerUpload.single('profilePicture'),userController.updateMe)
    .delete(userController.deleteMe);

module.exports = userRouter;