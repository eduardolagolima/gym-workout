const express = require('express')
const routes = express.Router()

const DashboardController = require('../controllers/DashboardController')
const TrainingController = require('../controllers/TrainingController')
const UserController = require('../controllers/UserController')

const auth = require('../middlewares/auth')
const { users, user } = require('../middlewares/database')
const { handleError } = require('../helpers/error')

routes.use(auth)

routes.use('/users', users)

routes.post('/users/login', UserController.login)
routes.post('/users/create', UserController.create)
routes.get('/users/show', UserController.show)
routes.put('/users/update', UserController.update)
routes.put('/users/password/change', UserController.passwordChange)
routes.post('/users/logout', UserController.logout)
routes.post('/users/logoutall', UserController.logoutall)

routes.use('/user', user)

routes.get('/user/dashboard/frequency/:year', DashboardController.frequency)
routes.get('/user/dashboard/muscle/:type/:date', DashboardController.muscle)

routes.get('/user/trainings/:day', TrainingController.show)
routes.put('/user/trainings/:day', TrainingController.update)

routes.use((error, req, res, next) => {
  handleError(error, res)
})

module.exports = routes
