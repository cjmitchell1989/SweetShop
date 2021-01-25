const {
  sweetShop: sweetShopController
} = require('../controllers')

const express = require('express')
const router = express.Router({ mergeParams: true })

router.post('/', sweetShopController.calculateDelivery)

module.exports = router