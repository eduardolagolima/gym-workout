const TrainingService = require('../services/TrainingService')
const handleSuccess = require('../helpers/success')

const show = async (req, res, next) => {
  try {
    const data = await TrainingService.show(req.params.date)
    return handleSuccess(res, data)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    await TrainingService.update(req.params.date, req.body.trainedMuscleGroups)
    return handleSuccess(res)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  show,
  update,
}
