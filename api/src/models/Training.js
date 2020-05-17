const { model } = require('mongoose')
const TrainingSchema = require('../schemas/TrainingSchema')

module.exports = model('Training', TrainingSchema)
