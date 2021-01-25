const {
  Delivery: DeliveryService
} = require('../services')
const Joi = require('joi')

const calculateDelivery = (req, res, next) => {

  const {
    pack_sizes,
    order_quantity
  } = req.body

  // Limit order quantity to 9,999,999 to not be ridiculous
  const schema = Joi.object({
    pack_sizes: Joi.array().items(Joi.number().required()).required(),
    order_quantity: Joi.number().integer().min(1).max(9999999).required()
  })

  // Return errors if inputs are out of bounds
  const { error, value } = schema.validate({ pack_sizes, order_quantity })
  if (error) {
    res.status(400).send({ message: error.message })
    return next()
  }

  // Create new delivery service
  const deliveryService = new DeliveryService(value.pack_sizes)
  
  // Attempt to calculate a delivery and return the result to the user
  try {
    const result = deliveryService.getDeliverySolutions({ orderQuantity: value.order_quantity })
    res.status(200).send(result)
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  calculateDelivery
}