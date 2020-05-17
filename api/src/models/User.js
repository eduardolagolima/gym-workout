const { model } = require('mongoose')
const UserSchema = require('../schemas/UserSchema')

module.exports = model('User', UserSchema)
