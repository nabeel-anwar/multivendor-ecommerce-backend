const express = require('express');
const stateController = require('../../controllers/locations/stateController');

const stateRouter = express.Router();

stateRouter
    .route('/')
    .get(stateController.getStates)
    .post(stateController.createState);

stateRouter
    .route('/:id')
    .get(stateController.getState)
    .patch(stateController.updateState)
    .delete(stateController.deleteState);

module.exports = stateRouter;