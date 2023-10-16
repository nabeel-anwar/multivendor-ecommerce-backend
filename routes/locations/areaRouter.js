const express = require('express');
const areaController = require('../../controllers/locations/areaController');

const areaRouter = express.Router();

areaRouter
    .route('/')
    .get(areaController.getAreas)
    .post(areaController.createArea);

areaRouter
    .route('/:id')
    .get(areaController.getArea)
    .patch(areaController.updateArea)
    .delete(areaController.deleteArea);

module.exports = areaRouter;