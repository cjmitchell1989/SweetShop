const { workerData, parentPort } = require('worker_threads')

const calculateDeliverySolutions = (packSizes, index, remainingTotal, currentSolution = {}, deliverySolutions = []) => {

  if (remainingTotal <= 0) {
    deliverySolutions.push(currentSolution)
    return deliverySolutions
  }

  if (index < 0) {
    return deliverySolutions
  }

  const packSize = packSizes[index]
  const packIncludedRemainingTotal = remainingTotal - packSize
  const packIncludedSolution = {...currentSolution}
  if (!Object.hasOwnProperty.call(packIncludedSolution, packSizes[index])) {
    packIncludedSolution[packSizes[index]] = 0
  }
  packIncludedSolution[packSizes[index]]++

  // Recurse twice
  // once with current pack size added
  // once without current pack size, moving on to next pack size
  const packIncluded = calculateDeliverySolutions(packSizes, index, packIncludedRemainingTotal, packIncludedSolution, [...deliverySolutions])
  const packExcluded = calculateDeliverySolutions(packSizes, index-1, remainingTotal, {...currentSolution}, [...deliverySolutions])

  return [...packIncluded, ...packExcluded]
}

const minimiseSweetsSolutions = (deliverySolutions) => {
  // Get only those with the best value of sweets
  let bestEffortSweets
  let bestSweetsSolutions = []

  deliverySolutions.forEach((solution) => {
    // Get array of pack sizes included in the solution
    const packSizesIncluded = Object.keys(solution)
    let totalSweets = 0
    // Add up the total of packSizes * their quantity to get total sweets
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

    // If this is the best solution so far, reset best solutions to only this solution as all previous are not the best
    if (totalSweets < bestEffortSweets) {
      bestEffortSweets = totalSweets
      bestSweetsSolutions = [solution]
    }      
  })

  return bestSweetsSolutions
}

const minimisePacksSolutions = (solutions) => {

  let bestEffortPacks
  let bestPacksSolutions = []

  solutions.forEach((solution) => {
    // Get array of pack sizes included in solution
    const packSizesIncluded = Object.keys(solution)
    let totalPacks = 0
    // Calculate total number of packs used in solution
    packSizesIncluded.forEach((packSize) => {
      totalPacks += solution[packSize]
    })

    // If this is the first solution checked, set it to the best effort
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

const deliverySolutions = calculateDeliverySolutions(workerData.packSizes, workerData.packSizes.length - 1, workerData.orderQuantity, {}, [])
const minimumSweetsSolutions = minimiseSweetsSolutions(deliverySolutions)
const minimalPacksSolutions = minimisePacksSolutions(minimumSweetsSolutions)

parentPort.postMessage(minimalPacksSolutions)