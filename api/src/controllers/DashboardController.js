const dayjs = require('dayjs')

const TrainingSchema = require('../schemas/TrainingSchema')
const getModel = require('../models/getModel')

const handleSuccess = require('../helpers/success')

module.exports = {
  async frequency(req, res, next) {
    try {
      const Training = await getModel(req.user._id, 'training', TrainingSchema)

      const year = parseInt(req.params.year)

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

      handleSuccess(res, { frequency })
    } catch (error) {
      next(error)
    }
  },

  async musclePerYear(req, res, next) {
    try {
      const Training = await getModel(req.user._id, 'training', TrainingSchema)

      const year = parseInt(req.params.year)

      const trainings = await Training.aggregate([
        {
          $project: {
            trainedMuscleGroups: '$trainedMuscleGroups',
            year: { $year: '$date' },
          },
        },
        {
          $match: { year: year },
        },
      ])

      const tmpMusclePerYear = {}

      trainings.forEach(({ trainedMuscleGroups }) => {
        trainedMuscleGroups.forEach(muscle => {
          tmpMusclePerYear[muscle]
            ? tmpMusclePerYear[muscle]++
            : (tmpMusclePerYear[muscle] = 1)
        })
      })

      const musclePerYear = {}

      Object.keys(tmpMusclePerYear)
        .sort()
        .forEach(muscle => (musclePerYear[muscle] = tmpMusclePerYear[muscle]))

      handleSuccess(res, { musclePerYear })
    } catch (error) {
      next(error)
    }
  },

  async musclePerMonth(req, res, next) {
    try {
      const Training = await getModel(req.user._id, 'training', TrainingSchema)

      let [year, month] = req.params.month.split('-')
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
            month: month,
          },
        },
      ])

      const tmpMusclePerMonth = {}

      trainings.forEach(({ trainedMuscleGroups }) => {
        trainedMuscleGroups.forEach(muscle => {
          tmpMusclePerMonth[muscle]
            ? tmpMusclePerMonth[muscle]++
            : (tmpMusclePerMonth[muscle] = 1)
        })
      })

      const musclePerMonth = {}

      Object.keys(tmpMusclePerMonth)
        .sort()
        .forEach(muscle => (musclePerMonth[muscle] = tmpMusclePerMonth[muscle]))

      handleSuccess(res, { musclePerMonth })
    } catch (error) {
      next(error)
    }
  },
}
