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


  describe('Test minimising sweets solutions', () => {
    it('It should return the solution with the least sweets', () => {
      const sweetSolutions = [
        {
          1: 1,
          2: 0,
          3: 0
        },
        {
          1: 0,
          2: 1,
          3: 0
        },
        {
          1: 0,
          2: 0,
          3: 1
        }
      ]
      const deliveryService = new DeliveryService()
      const minimalSweetsSolution = deliveryService.minimiseSweetsSolutions(sweetSolutions)

      expect(minimalSweetsSolution).to.deep.equal([sweetSolutions[0]])
    })
  })

  describe('Test minimising packs solutions', () => {
    it('It should return the solution with the least packs', () => {
      const sweetSolutions = [
        {
          1: 1,
          2: 0,
          3: 0
        },
        {
          1: 0,
          2: 1,
          3: 0
        },
        {
          1: 0,
          2: 0,
          3: 1
        }
      ]
      const deliveryService = new DeliveryService()
      const minimalSweetsSolution = deliveryService.minimisePacksSolutions(sweetSolutions)

      expect(minimalSweetsSolution).to.deep.equal(sweetSolutions)
    })

    it('It should return the solution with the least packs', () => {
      const sweetSolutions = [
        {
          1: 0,
          2: 0,
          3: 1
        },
        {
          1: 1,
          2: 1,
          3: 0
        }
      ]
      const deliveryService = new DeliveryService()
      const minimalSweetsSolution = deliveryService.minimisePacksSolutions(sweetSolutions)

      expect(minimalSweetsSolution).to.deep.equal([sweetSolutions[0]])
    })
  })


  
  describe('Test calculating deliveries', () => {

    const packSizes = [5000, 2000, 1000, 500, 250]

    it('It should return the best solution(s) with the least sweets and least packs', () => {
      
      const deliveryService = new DeliveryService(packSizes)
      const solution = deliveryService.getDeliverySolutions({ orderQuantity: 1})

      expect(solution).to.deep.equal([{ 250: 1}])
    })

    it('It should return the best solution(s) with the least sweets and least packs', () => {
      
      const deliveryService = new DeliveryService(packSizes)
      const solution = deliveryService.getDeliverySolutions({ orderQuantity: 250})

      expect(solution).to.deep.equal([{ 250: 1}])
    })

    it('It should return the best solution(s) with the least sweets and least packs', () => {
      
      const deliveryService = new DeliveryService(packSizes)
      const solution = deliveryService.getDeliverySolutions({ orderQuantity: 251})

      expect(solution).to.deep.equal([{ 500: 1}])
    })

    it('It should return the best solution(s) with the least sweets and least packs', () => {
      
      const deliveryService = new DeliveryService(packSizes)
      const solution = deliveryService.getDeliverySolutions({ orderQuantity: 501})

      expect(solution).to.deep.equal([{ 500: 1, 250: 1}])
    })

    it('It should return the best solution(s) with the least sweets and least packs', () => {
      
      const deliveryService = new DeliveryService(packSizes)
      const solution = deliveryService.getDeliverySolutions({ orderQuantity: 12001})

      expect(solution).to.deep.equal([{ 5000: 2, 2000: 1, 250: 1}])
    })

  })

})