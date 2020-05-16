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
        return handleSuccess(res)
      }

      await Training.findOneAndUpdate({ date: req.params.day }, req.body, {
        upsert: true,
      })

      handleSuccess(res)
    } catch (error) {
      next(error)
    }
  },
}
