const BuyController = require('../controllers/BuyItemController.js')
const auth = require('../authentication/authentication.js')

const router = require('express').Router()

router.get('/get/:id', auth.authenticateUser, BuyController.findBuyProduct)

router.post('/addProduct', auth.authenticateUser ,BuyController.BuyGrocery)

router.delete('/dlt/:id',auth.authenticateUser , BuyController.deleteProd)

router.get('/allpurchased/:id',  BuyController.findUserpurchased)

module.exports = router
