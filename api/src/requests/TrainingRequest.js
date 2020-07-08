const { Segments, Joi } = require('celebrate')

const show = {
  [Segments.PARAMS]: Joi.object().keys({
    date: Joi.date().required(),
  }),
}

const update = {
  [Segments.PARAMS]: Joi.object().keys({
    date: Joi.date().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    trainedMuscleGroups: Joi.array().required(),
  }),
}

module.exports = {
  show,
  update,
}
