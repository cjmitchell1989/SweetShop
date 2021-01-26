const {
  server: {
    port: SERVER_PORT
  }
} = require('./config')

const app = require('./app')
const server = app.listen(SERVER_PORT, () => {
  console.info(`Server listening on port ${SERVER_PORT}`)
})

const shutdown = ({ code = 0, message = 'FAIL' } = {}) => {
  console.log(`Shutting down with error code: ${code} Message: ${message}`)
  if (server) {
    server.close()
  }
  process.exit()
}
process.on('SIGINT', () => { shutdown({ code: 1, message: 'SIGINT' }) })
process.on('SIGTERM', () => { shutdown({ code: 1, message: 'SIGTERM' }) })


module.exports = server