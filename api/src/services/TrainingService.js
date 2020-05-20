const Training = require('../models/Training')

const show = async date => {
  const training = await Training.findOne({ date })
  const trainedMuscleGroups = training ? training.trainedMuscleGroups : []
  return { trainedMuscleGroups }
}

const update = async (date, trainedMuscleGroups) => {
  if (trainedMuscleGroups.length > 0) {
    await Training.findOneAndUpdate(
      { date },
      { trainedMuscleGroups },
      { upsert: true }
    )
  } else {
    await Training.findOneAndRemove({ date })
  }
}

module.exports = {
  show,
  update,
}
