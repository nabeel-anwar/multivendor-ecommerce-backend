const express = require('express');
const cityController = require('../../controllers/locations/cityController');

const cityRouter = express.Router();

cityRouter
    .route('/')
    .get(cityController.getCities)
    .post(cityController.createCity);

cityRouter
    .route('/:id')
    .get(cityController.getCity)
    .patch(cityController.updateCity)
    .delete(cityController.deleteCity);

module.exports = cityRouter;