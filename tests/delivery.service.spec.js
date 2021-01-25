const {
  Delivery: DeliveryService
} = require('../src/services')

const chai = require('chai')
const assert = chai.assert
const expect = chai.expect

describe('Test the DeliveryService', () => {
  describe('Test Setting and Getting PackSizes', () => {

    it('It should return the same packsizes entered', (done) => {
      const deliveryService = new DeliveryService([1, 2, 3])
      expect(deliveryService.packSizes).to.have.members([1, 2, 3])
      done()
    })

    it('It should return the same packsizes entered with duplicates removed', (done) => {
      const deliveryService = new DeliveryService([1, 2, 3, 1, 2, 3])
      expect(deliveryService.packSizes).to.have.members([1, 2, 3])
      done()
    })

    

  })


  describe('Test removing duplicates from array', () => {

  })

})