const {
  errors: {
    ResponseError
  }
} = require('../lib')
const cors = require('cors')
const uuid = require('uuid')

// Set the cors config for the app
const corsConfig = cors({
  origin: '*'
})

// Return diff between parameter hrtime and current hrtime
const getDurationInMillis = (start) => {
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

// Set listeners on http stream events to log out response times
const transactionLogger = (req, res, next) => {
  const transactionUuid = uuid.v4()
  const transactionStartTime = process.hrtime()

  res.on('finish', () => {
    const durationInMillis = getDurationInMillis(transactionStartTime)
    console.info(`Transaction ${transactionUuid} ${req.method} ${req.originalUrl} [FINISHED] ${durationInMillis.toLocaleString()}ms`)
  })

  res.on('close', () => {
    const durationInMillis = getDurationInMillis(transactionStartTime)
    console.info(`Transaction ${transactionUuid} ${req.method} ${req.originalUrl} [CLOSED] ${durationInMillis.toLocaleString()}ms`)
  })

  res.on('event', (event) => {
    const durationInMillis = getDurationInMillis(transactionStartTime)
    console.info(`Transaction ${transactionUuid} ${req.method} ${req.originalUrl} [${event.toUpperCase()}] ${durationInMillis.toLocaleString()}ms`)
  })

  return next()
}

// If a route doesn't exist, return this to user
const catchBadRoute = (req, res, next) => {
  if (!res.headersSent) {
    // If heasders not sent then no route has been found to respond to user
    // Set an error and fall to error handler
    return next(new ResponseError({ statusCode: 404, message: 'Route not found' }))
  }
  return next()
}

// Set up error handler so any error passed by next(err) is caught
const errorHandler = (err, req, res, next) => {
  if (err && err.statusCode) {
    res.status(err.statusCode).send({ message: err.message })
  } else {
    res.status(500).send({ message: 'Server error' })
  }
  return next()
}

module.exports = {
  transactionLogger,
  corsConfig,
  catchBadRoute,
  errorHandler
}