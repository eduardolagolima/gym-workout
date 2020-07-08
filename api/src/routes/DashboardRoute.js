const express = require('express')
const { celebrate } = require('celebrate')

const routes = express.Router()

const DashboardController = require('../controllers/DashboardController')
const DashboardRequest = require('../requests/DashboardRequest')

routes.get(
  '/user/dashboard/frequency/:date',
  celebrate(DashboardRequest.frequency),
  DashboardController.frequency
)
routes.get(
  '/user/dashboard/muscle/:date',
  celebrate(DashboardRequest.muscle),
  DashboardController.muscle
)

module.exports = routes
