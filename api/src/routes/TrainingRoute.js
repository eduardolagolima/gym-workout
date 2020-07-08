const express = require('express')
const { celebrate } = require('celebrate')

const routes = express.Router()

const TrainingController = require('../controllers/TrainingController')
const TrainingRequest = require('../requests/TrainingRequest')

routes.get(
  '/user/trainings/:date',
  celebrate(TrainingRequest.show),
  TrainingController.show
)
routes.put(
  '/user/trainings/:date',
  celebrate(TrainingRequest.update),
  TrainingController.update
)

module.exports = routes
