const mongoose = require('mongoose')

const connect = async database => {
  await mongoose.disconnect()
  await mongoose.connect(`${process.env.MONGODB_URL}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
}

const connectUsers = async (req, res, next) => {
  try {
    await connect('users')
    next()
  } catch (error) {
    next(error)
  }
}

const connectUser = async (req, res, next) => {
  try {
    await connect(req.user._id)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  connectUsers,
  connectUser,
}
