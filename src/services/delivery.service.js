const {
  core: {
    removeArrayDuplicates
  }
} = require('../util')
const {
  errors: {
    ResponseError
  }
} = require('../lib')
const { Worker } = require('worker_threads')

class DeliveryService {

  constructor(packSizes) {
    // Instantiate with the pack
    this._packSizes = removeArrayDuplicates(packSizes)
    this._closestGuessDelta
  }

  get packSizes() {
    return this._packSizes
  }

  runWorker(data) {
    return new Promise((resolve, reject) => {
      const deliveryWorker = new Worker('./src/services/deliveryCalc.js', { workerData: data })
      deliveryWorker.on('message', (result) => {
        resolve(result)
      })
      deliveryWorker.on('error', reject)
      deliveryWorker.on('exit', (code) => {
        if (code !== 0) {
          reject(new ResponseError({ statusCode: 503, message: 'Something broke...'}))
        }
      })
    })
  }

  async getDeliverySolutions({ orderQuantity }) {

    const result = await this.runWorker({ packSizes: this.packSizes, orderQuantity })
    return result

  }

}

module.exports = DeliveryService