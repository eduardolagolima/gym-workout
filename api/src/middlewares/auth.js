const jwt = require('jsonwebtoken')

const UserSchema = require('../schemas/UserSchema')
const getModel = require('../models/getModel')
const { ErrorHandler } = require('../helpers/error')

const auth = async (req, res, next) => {
  try {
    const User = await getModel('users', 'users', UserSchema)

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
