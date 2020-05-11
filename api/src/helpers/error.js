class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

const handleError = (error, res) => {
  if (!(error instanceof ErrorHandler)) {
    if (error.name === 'MongoError' && error.code === 11000) {
      // username or email
      const field = Object.keys(error.keyValue)[0]
      error = new ErrorHandler(409, `This ${field} is already registered`)
    } else {
      error = new ErrorHandler(400, error.message)
    }
  }

  const { statusCode, message } = error

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  })
}

module.exports = {
  ErrorHandler,
  handleError,
}
