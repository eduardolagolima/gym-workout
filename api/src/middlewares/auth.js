const jwt = require('jsonwebtoken')

const User = require('../models/User')

const { ErrorHandler } = require('../helpers/error')

const auth = async (req, res, next) => {
  try {
    const url = req.originalUrl

    if (url === '/users/login' || url === '/users/create') {
      return next()
    }

    let token = req.header('Authorization')

    if (!token) {
      throw new ErrorHandler(401, 'Not authorized to access this resource')
    }

    token = token.replace('Bearer ', '')

    if (!token) {
      throw new ErrorHandler(401, 'Not authorized to access this resource')
    }

    const data = jwt.verify(token, process.env.JWT_KEY)
    const user = await User.findOne({ _id: data._id, 'tokens.token': token })

    if (!user) {
      throw new ErrorHandler(401, 'Not authorized to access this resource')
    }

    req.user = user
    req.token = token

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = auth
