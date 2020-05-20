const UserService = require('../services/UserService')
const handleSuccess = require('../helpers/success')

const login = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body
    const data = await UserService.login(usernameOrEmail, password)
    return handleSuccess(res, data)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const { username, name, email, password } = req.body
    const data = await UserService.create(username, name, email, password)
    return handleSuccess(res, data, 201, 'User created successfully.')
  } catch (error) {
    next(error)
  }
}

const getProfile = async (req, res, next) => {
  try {
    const data = await UserService.getProfile(req.user)
    return handleSuccess(res, data)
  } catch (error) {
    next(error)
  }
}

const editProfile = async (req, res, next) => {
  try {
    const { username, name, email } = req.body
    await UserService.editProfile(req.user, username, name, email)
    return handleSuccess(res, null, 200, 'Profile updated successfully.')
  } catch (error) {
    next(error)
  }
}

const toggleDarkMode = async (req, res, next) => {
  try {
    await UserService.toggleDarkMode(req.user, req.body.darkMode)
    return handleSuccess(res)
  } catch (error) {
    next(error)
  }
}

const changeLocale = async (req, res, next) => {
  try {
    await UserService.changeLocale(req.user, req.body.locale)
    return handleSuccess(res)
  } catch (error) {
    next(error)
  }
}

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body
    await UserService.changePassword(
      req.user,
      currentPassword,
      newPassword,
      confirmNewPassword
    )
    return handleSuccess(res, null, 200, 'Password changed successfully.')
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    await UserService.logout(req)
    return handleSuccess(res, null, 204)
  } catch (error) {
    next(error)
  }
}

const logoutAll = async (req, res, next) => {
  try {
    await UserService.logoutAll(req)
    return handleSuccess(res, null, 204)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
  create,
  getProfile,
  editProfile,
  toggleDarkMode,
  changeLocale,
  changePassword,
  logout,
  logoutAll,
}
