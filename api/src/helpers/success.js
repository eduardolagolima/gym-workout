const handleSuccess = (res, data = null, statusCode = 200, message = null) => {
  res.status(statusCode).json({
    status: 'success',
    statusCode,
    message,
    data,
  })
}

module.exports = handleSuccess
