function handleError(err, req, res, next) {
  res.status(err.statusCode)
  res.send({
      statusCode: err.statusCode,
      message: err.message,
      description: err.name,
  })
}

function logError(err, req, res, next) {
  console.error(err);
  next(err);
}

module.exports = {
  handleError, logError,
}
