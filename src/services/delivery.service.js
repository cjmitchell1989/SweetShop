const {
  core: {
    removeArrayDuplicates
  }
} = require('../util')

class DeliveryService {

  constructor(packSizes) {
    // Instantiate with the pack
    this._packSizes = removeArrayDuplicates(packSizes)
    this._deliverySolutions = []
  }

  get packSizes() {
    return this._packSizes
  }

  get deliverySolutions() {
    return this._deliverySolutions
  }

  

  calculateDelivery({ orderQuantity }) {

    this.calculatePackSolutions(orderQuantity, this.packSizes.length - 1, {})

    // Rule 1 - Deliver least amount of sweets equaling or above the target

    // Get only those with the best value of sweets
    let bestEffortSweets
    let bestSweetsSolutions = []

    this.deliverySolutions.forEach((solution) => {
      const packSizesIncluded = Object.keys(solution)
      let totalSweets = 0
      packSizesIncluded.forEach((packSize) => {
        totalSweets += packSize * solution[packSize]
      })

      // If this is the first solution checked, set it to the best effort
      if (!bestEffortSweets) {
        bestEffortSweets = totalSweets
      }

      // If this solution matches the best effort, add it to the best solutions
      if (totalSweets === bestEffortSweets) {
        bestSweetsSolutions.push(solution)
      }

      // If this is the best solution so far, reset best solutions to only this solution
      if (totalSweets < bestEffortSweets) {
        bestEffortSweets = totalSweets
        bestSweetsSolutions = [solution]
      }      
    })

    // Rule 2 - Deliver the least amount of packs
    let bestEffortPacks
    let bestPacksSolutions = []

    bestSweetsSolutions.forEach((solution) => {
      const packSizesIncluded = Object.keys(solution)
      let totalPacks = 0
      packSizesIncluded.forEach((packSize) => {
        totalPacks += solution[packSize]
      })

      if (!bestEffortPacks) {
        bestEffortPacks = totalPacks
      }

      // If this solution matches the best effort, add it to the best solutions
      if (totalPacks === bestEffortPacks) {
        bestPacksSolutions.push(solution)
      }

      // If this is the best solution so far, reset best solutions to only this solution
      if (totalPacks < bestEffortPacks) {
        bestEffortPacks = totalPacks
        bestPacksSolutions = [solution]
      }
    })

    return bestPacksSolutions

  }


  calculatePackSolutions(remainingTotal, index, solution = {}) {

    if (remainingTotal <= 0) {
      this._deliverySolutions.push(solution)
      return
    }

    if (index < 0) {
      return
    }

    const packSize = this.packSizes[index]
    const packIncludedRemainingTotal = remainingTotal - packSize
    const packIncludedSolution = {...solution}
    if (!Object.hasOwnProperty.call(packIncludedSolution, this.packSizes[index])) {
      packIncludedSolution[this.packSizes[index]] = 0
    }
    packIncludedSolution[this.packSizes[index]]++

    // Recurse twice, once with current pack size added, and once moving on to next pack size
    this.calculatePackSolutions(packIncludedRemainingTotal, index, packIncludedSolution)
    this.calculatePackSolutions(remainingTotal, index-1, {...solution})
  }

}

module.exports = DeliveryService