const {
  errors: {
    ResponseError
  }
} = require('../src/lib')

const chai = require('chai')
const assert = chai.assert

describe('Errors lib unit tests', () => {
  describe('Test ResponseError', () => {

    it('It should return a response error with status code and message set', (done) => {
      const responseError = new ResponseError({ statusCode: 400, message: 'test' })
      assert.typeOf(responseError, 'Error')
      assert.equal(responseError.statusCode, 400)
      assert.equal(responseError.message, 'test')
      done()
    })

    it('It should return a response error with default values set', (done) => {
      const responseError = new ResponseError()
      assert.typeOf(responseError, 'Error')
      assert.equal(responseError.statusCode, 503)
      assert.equal(responseError.message, 'Server error')
      done()
    })

  })

})