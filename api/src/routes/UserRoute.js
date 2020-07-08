const express = require('express')
const { celebrate } = require('celebrate')

const routes = express.Router()

const UserController = require('../controllers/UserController')
const UserRequest = require('../requests/UserRequest')

routes.post('/users/login', celebrate(UserRequest.login), UserController.login)
routes.post(
  '/users/create',
  celebrate(UserRequest.create),
  UserController.create
)
routes.get('/users/profile', UserController.getProfile)
routes.put(
  '/users/profile/edit',
  celebrate(UserRequest.editProfile),
  UserController.editProfile
)
routes.put(
  '/users/darkmode/toggle',
  celebrate(UserRequest.toggleDarkMode),
  UserController.toggleDarkMode
)
routes.put(
  '/users/locale/change',
  celebrate(UserRequest.changeLocale),
  UserController.changeLocale
)
routes.put(
  '/users/password/change',
  celebrate(UserRequest.changePassword),
  UserController.changePassword
)
routes.post('/users/logout', UserController.logout)
routes.post('/users/logout/all', UserController.logoutAll)

module.exports = routes
