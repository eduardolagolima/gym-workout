const TrainingSchema = require('../schemas/TrainingSchema')
const getModel = require('../models/getModel')

const handleSuccess = require('../helpers/success')

module.exports = {
  async show(req, res, next) {
    try {
      const Training = await getModel(req.user._id, 'training', TrainingSchema)
      const training = await Training.findOne({ date: req.params.day })
      const trainedMuscleGroups = training ? training.trainedMuscleGroups : []
      handleSuccess(res, { trainedMuscleGroups })
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    try {
      const Training = await getModel(req.user._id, 'training', TrainingSchema)

      if (!req.body.trainedMuscleGroups.length) {
        await Training.findOneAndRemove({ date: req.params.day })
        return handleSuccess(res, { trainedMuscleGroups: [] })
      }

      const { trainedMuscleGroups } = await Training.findOneAndUpdate(
        { date: req.params.day },
        req.body,
        { new: true, upsert: true }
      )

      handleSuccess(res, { trainedMuscleGroups })
    } catch (error) {
      next(error)
    }
  },
}
