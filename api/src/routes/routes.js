const express = require('express')
const routes = express.Router()

const DashboardController = require('../controllers/DashboardController')
const TrainingController = require('../controllers/TrainingController')
const UserController = require('../controllers/UserController')

const auth = require('../middlewares/auth')
const { users, user } = require('../middlewares/database')
const { handleError } = require('../helpers/error')

routes.use([users, auth])

routes.post('/users/login', UserController.login)
routes.post('/users/create', UserController.create)
routes.get('/users/profile', UserController.getProfile)
routes.put('/users/update', UserController.update)
routes.put('/users/password/change', UserController.changePassword)
routes.post('/users/logout', UserController.logout)
routes.post('/users/logout/all', UserController.logoutAll)

routes.use('/user', user)

routes.get('/user/dashboard/frequency/:date', DashboardController.frequency)
routes.get('/user/dashboard/muscle/:type/:date', DashboardController.muscle)

routes.get('/user/trainings/:date', TrainingController.show)
routes.put('/user/trainings/:date', TrainingController.update)

routes.use((error, req, res, next) => {
  handleError(error, res)
})

module.exports = routes
