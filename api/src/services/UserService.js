const bcrypt = require('bcryptjs')

const User = require('../models/User')
const { ErrorHandler } = require('../helpers/error')

const login = async (usernameOrEmail, password) => {
  const user = await User.findByCredentials(usernameOrEmail, password)
  const token = await user.generateAuthToken()
  return {
    name: user.name,
    darkMode: user.darkMode,
    locale: user.locale,
    token,
  }
}

const create = async (username, name, email, password) => {
  const user = new User({ username, name, email, password })
  await user.save()
  const token = await user.generateAuthToken()
  return {
    name: user.name,
    darkMode: user.darkMode,
    locale: user.locale,
    token,
  }
}

const getProfile = async user => {
  return {
    username: user.username,
    name: user.name,
    email: user.email,
  }
}

const editProfile = async (user, username, name, email) => {
  user.username = username
  user.name = name
  user.email = email
  user.save()
}

const toggleDarkMode = async (user, darkMode) => {
  user.darkMode = darkMode
  user.save()
}

const changeLocale = async (user, locale) => {
  user.locale = locale
  user.save()
}

const changePassword = async (
  user,
  currentPassword,
  newPassword,
  confirmNewPassword
) => {
  const isPasswordMatch = await bcrypt.compare(currentPassword, user.password)

  if (!isPasswordMatch) {
    throw new ErrorHandler(
      400,
      'Your old password was entered incorrectly. Please enter it again.'
    )
  }

  if (newPassword === currentPassword) {
    throw new ErrorHandler(
      400,
      `Create a new password that isn't your current password.`
    )
  }

  user.password = newPassword
  user.save()
}

const logout = async req => {
  req.user.tokens = req.user.tokens.filter(({ token }) => {
    return token !== req.token
  })
  await req.user.save()
}

const logoutAll = async req => {
  req.user.tokens.splice(0, req.user.tokens.length)
  await req.user.save()
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
