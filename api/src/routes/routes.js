const express = require('express')
const routes = express.Router()

const DashboardController = require('../controllers/DashboardController')
const TrainingController = require('../controllers/TrainingController')
const UserController = require('../controllers/UserController')

const auth = require('../middlewares/auth')
const { handleError } = require('../helpers/error')

// Rotas que NÃO PRECISAM de autenticação
routes.post('/users', UserController.store)
routes.post('/users/login', UserController.login)

routes.use(auth)

// Rotas que PRECISAM de autenticação
routes.get('/dashboard/frequency/:year', DashboardController.frequency)
routes.get('/dashboard/muscle/year/:year', DashboardController.musclePerYear)
routes.get('/dashboard/muscle/month/:month', DashboardController.musclePerMonth)

routes.get('/trainings/:day', TrainingController.show)
routes.put('/trainings/:day', TrainingController.update)

routes.get('/users', UserController.show)
routes.put('/users', UserController.update)
routes.put('/users/password/change', UserController.passwordChange)
routes.post('/users/logout', UserController.logout)
routes.post('/users/logoutall', UserController.logoutall)

routes.use((error, req, res, next) => {
  handleError(error, res)
})

module.exports = routes
