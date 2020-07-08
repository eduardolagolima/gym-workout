const { Segments, Joi } = require('celebrate')

const login = {
  [Segments.BODY]: Joi.object().keys({
    usernameOrEmail: Joi.string().required(),
    password: Joi.string().required(),
  }),
}

const create = {
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string()
      .required()
      .regex(/^[a-z0-9]+$/), // only letters and numbers
    name: Joi.string().required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required(),
    confirmPassword: Joi.valid(Joi.ref('password')),
  }),
}

const editProfile = {
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string()
      .required()
      .regex(/^[a-z0-9]+$/), // only letters and numbers,
    name: Joi.string().required(),
    email: Joi.string()
      .required()
      .email(),
  }),
}

const toggleDarkMode = {
  [Segments.BODY]: Joi.object().keys({
    darkMode: Joi.boolean().required(),
  }),
}

const changeLocale = {
  [Segments.BODY]: Joi.object().keys({
    locale: Joi.string().required(),
  }),
}

const changePassword = {
  [Segments.BODY]: Joi.object().keys({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmNewPassword: Joi.any().valid(Joi.ref('newPassword')),
  }),
}

module.exports = {
  login,
  create,
  editProfile,
  toggleDarkMode,
  changeLocale,
  changePassword,
}
