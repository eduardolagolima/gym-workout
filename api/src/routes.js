const express = require('express')

const routes = express.Router()

const auth = require('./middlewares/auth')
const { users, user } = require('./middlewares/database')
const { handleError } = require('./helpers/error')
const UserRoute = require('./routes/UserRoute')
const DashboardRoute = require('./routes/DashboardRoute')
const TrainingRoute = require('./routes/TrainingRoute')

routes.use([users, auth])
routes.use(UserRoute)
routes.use('/user', user)
routes.use(DashboardRoute)
routes.use(TrainingRoute)

routes.use((error, req, res, next) => {
  handleError(error, res)
})

module.exports = routes
