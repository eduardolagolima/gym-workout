const dayjs = require('dayjs')

const Training = require('../models/Training')

const handleSuccess = require('../helpers/success')

module.exports = {
  async frequency(req, res, next) {
    try {
      const year = parseInt(req.params.date)

      const trainings = await Training.aggregate([
        {
          $project: {
            date: '$date',
            year: { $year: '$date' },
          },
        },
        {
          $match: { year: year },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%m/%Y', date: '$date' } },
            trainingDays: { $sum: 1 },
          },
        },
      ])

      const frequency = []

      // dayjs month 0 to 11
      for (let i = 0; i < 12; i++) {
        const date = dayjs()
          .year(year)
          .month(i)

        const month = date.format('MM/YYYY')
        const daysInMonth = date.daysInMonth()
        const monthData = trainings.find(training => training._id === month)
        const trainingDays = monthData ? monthData.trainingDays : 0

        frequency.push({ month, daysInMonth, trainingDays })
      }

      return handleSuccess(res, { frequency })
    } catch (error) {
      next(error)
    }
  },

  async muscle(req, res, next) {
    try {
      let [year, month] = req.params.date.split('-')
      year = parseInt(year)
      month = parseInt(month)

      const trainings = await Training.aggregate([
        {
          $project: {
            trainedMuscleGroups: '$trainedMuscleGroups',
            year: { $year: '$date' },
            month: { $month: '$date' },
          },
        },
        {
          $match: {
            year: year,
            ...(month && {
              month: month,
            }),
          },
        },
      ])

      const tmpMuscle = {}

      trainings.forEach(({ trainedMuscleGroups }) => {
        trainedMuscleGroups.forEach(value => {
          tmpMuscle[value] ? tmpMuscle[value]++ : (tmpMuscle[value] = 1)
        })
      })

      const muscle = {}

      Object.keys(tmpMuscle)
        .sort()
        .forEach(value => (muscle[value] = tmpMuscle[value]))

      return handleSuccess(res, { muscle })
    } catch (error) {
      next(error)
    }
  },
}
