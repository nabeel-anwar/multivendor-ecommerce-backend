const express = require('express');
const addressController = require('../controllers/locations/addressController');

const addressRouter = express.Router();

addressRouter
    .route('/')
    .get(addressController.getAddresses)
    .post(addressController.createAddress);

addressRouter
    .route('/:id')
    .get(addressController.getAddress)
    .patch(addressController.updateAddress)
    .delete(addressController.deleteAddress);

module.exports = addressRouter;