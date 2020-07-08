const { Segments, Joi } = require('celebrate')

const frequency = {
  [Segments.PARAMS]: Joi.object().keys({
    date: Joi.number().required(),
  }),
}

const muscle = {
  [Segments.PARAMS]: Joi.object().keys({
    date: Joi.string().required(),
  }),
}

module.exports = {
  frequency,
  muscle,
}
