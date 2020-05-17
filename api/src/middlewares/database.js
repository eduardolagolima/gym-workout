const mongoose = require('mongoose')

const connect = async database => {
  await mongoose.connect(`${process.env.MONGODB_URL}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
}

const users = async (req, res, next) => {
  try {
    await connect('users')
    next()
  } catch (error) {
    next(error)
  }
}

const user = async (req, res, next) => {
  try {
    await connect(req.user._id)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  users,
  user,
}
