const Training = require('../models/Training')

const handleSuccess = require('../helpers/success')

module.exports = {
  async show(req, res, next) {
    try {
      const training = await Training.findOne({ date: req.params.date })
      const trainedMuscleGroups = training ? training.trainedMuscleGroups : []
      return handleSuccess(res, { trainedMuscleGroups })
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    try {
      if (!req.body.trainedMuscleGroups.length) {
        await Training.findOneAndRemove({ date: req.params.date })
        return handleSuccess(res)
      }

      await Training.findOneAndUpdate({ date: req.params.date }, req.body, {
        upsert: true,
      })

      return handleSuccess(res)
    } catch (error) {
      next(error)
    }
  },
}
