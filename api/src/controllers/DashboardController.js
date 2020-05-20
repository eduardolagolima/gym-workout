const DashboardService = require('../services/DashboardService')
const handleSuccess = require('../helpers/success')

const frequency = async (req, res, next) => {
  try {
    const year = parseInt(req.params.date)
    const data = await DashboardService.frequency(year)
    return handleSuccess(res, data)
  } catch (error) {
    next(error)
  }
}

const muscle = async (req, res, next) => {
  try {
    let [year, month] = req.params.date.split('-')
    year = parseInt(year)
    month = parseInt(month)
    const data = await DashboardService.muscle(year, month)
    return handleSuccess(res, data)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  frequency,
  muscle,
}
