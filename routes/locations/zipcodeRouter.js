const express = require('express');
const zipcodeController = require('./../../controllers/locations/zipcodeController');


const zipcodeRouter = express.Router();

zipcodeRouter
    .route('/')
    .get(zipcodeController.getZipcodes)
    .post(zipcodeController.createZipcode);

zipcodeRouter
    .route('/:id')
    .get(zipcodeController.getZipcode)
    .patch(zipcodeController.updateZipcode)
    .delete(zipcodeController.deleteZipcode);

module.exports = zipcodeRouter;