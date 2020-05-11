const { Schema } = require('mongoose')

const TrainingSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  trainedMuscleGroups: {
    type: Array,
  },
})

module.exports = TrainingSchema
