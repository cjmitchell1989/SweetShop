const {
  core: {
    removeArrayDuplicates
  }
} = require('../src/util')

const chai = require('chai')
const expect = chai.expect

describe('Core util unit tests', () => {
  describe('Test removing duplicate vaules from array', () => {

    it('It should return a new array the same as the original', (done) => {
      const newArray = removeArrayDuplicates([1, 2, 3, 4, 5])
      expect(newArray).to.have.members([1, 2, 3, 4, 5])
      done()
    })

    it('It should return a new array with duplicates removed', (done) => {
      const newArray = removeArrayDuplicates([1, 2, 3, 4, 5, 1, 2 , 3, 4, 5])
      expect(newArray).to.have.members([1, 2, 3, 4, 5])
      done()
    })

  })

})