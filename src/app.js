const {
  core: {
    transactionLogger,
    corsConfig,
    catchBadRoute,
    errorHandler
  }
} = require('./middlewares')
const routes = require('./routes')

const express = require('express')
const router = express.Router({ mergeParams: true })
router.use('/', routes)

const app = express()

app.use(transactionLogger)
app.use(corsConfig)

// Remove x-powered-by to hide express
app.disable('x-powered-by')
// Query parser
app.set('query parser', 'simple')
// Only parse body if JSON
app.use(express.json())

app.use(router)

app.use(catchBadRoute)
app.use(errorHandler)

module.exports = app