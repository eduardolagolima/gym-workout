const UserSchema = require('../schemas/UserSchema')
const getModel = require('../models/getModel')

const handleSuccess = require('../helpers/success')

const bcrypt = require('bcryptjs')
const { ErrorHandler } = require('../helpers/error')

module.exports = {
  async store(req, res, next) {
    try {
      const User = await getModel('users', 'users', UserSchema)
      const user = new User(req.body)
      await user.save()

      const token = await user.generateAuthToken()

      const data = {
        name: user.name,
        token,
        darkMode: user.darkMode,
        locale: user.locale,
      }

      return handleSuccess(res, data, 201, 'User created successfully.')
    } catch (error) {
      next(error)
    }
  },

  async login(req, res, next) {
    try {
      const { usernameOrEmail, password } = req.body
      const User = await getModel('users', 'users', UserSchema)
      const user = await User.findByCredentials(usernameOrEmail, password)

      const token = await user.generateAuthToken()

      const data = {
        name: user.name,
        token,
        darkMode: user.darkMode,
        locale: user.locale,
      }

      return handleSuccess(res, data)
    } catch (error) {
      next(error)
    }
  },

  async show(req, res, next) {
    try {
      const { username, name, email } = req.user
      return handleSuccess(res, { user: { username, name, email } })
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    try {
      const User = await getModel('users', 'users', UserSchema)
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        req.body,
        { new: true }
      )

      const data = {
        name: user.name,
        token: req.token,
        darkMode: user.darkMode,
        locale: user.locale,
      }

      return handleSuccess(res, data, 200, 'User updated successfully.')
    } catch (error) {
      next(error)
    }
  },

  async passwordChange(req, res, next) {
    try {
      const { currentPassword, newPassword, confirmNewPassword } = req.body

      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        req.user.password
      )

      if (!isPasswordMatch) {
        throw new ErrorHandler(
          400,
          'Your old password was entered incorrectly. Please enter it again.'
        )
      }

      if (newPassword !== confirmNewPassword) {
        throw new ErrorHandler(400, 'Please make sure both passwords match.')
      }

      if (newPassword === currentPassword) {
        throw new ErrorHandler(
          400,
          `Create a new password that isn't your current password.`
        )
      }

      const User = await getModel('users', 'users', UserSchema)
      const user = await User.findOne({ _id: req.user._id })
      user.password = newPassword
      user.save()

      return handleSuccess(res, null, 200, 'Password changed successfully.')
    } catch (error) {
      next(error)
    }
  },

  async logout(req, res, next) {
    try {
      req.user.tokens = req.user.tokens.filter(token => {
        return token.token !== req.token
      })
      await req.user.save()
      return handleSuccess(res, null, 204)
    } catch (error) {
      next(error)
    }
  },

  async logoutall(req, res, next) {
    try {
      req.user.tokens.splice(0, req.user.tokens.length)
      await req.user.save()
      return handleSuccess(res, null, 204)
    } catch (error) {
      next(error)
    }
  },
}
