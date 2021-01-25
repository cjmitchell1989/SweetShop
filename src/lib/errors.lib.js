class ResponseError extends Error {

  constructor({ message = 'Server error', statusCode = 503 } = {}) {
    super(message)
    this._statusCode = statusCode
  }

  get statusCode() {
    return this._statusCode
  }
}

module.exports = {
  ResponseError
}