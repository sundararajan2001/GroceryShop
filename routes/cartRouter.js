const cartController = require('../controllers/cartController.js')
const auth = require('../authentication/authentication.js')
const router = require('express').Router()
router.use(auth.authenticateUser)

router.post('/addCart', cartController.addCart)

router.get('/getAllcarts', cartController.getAllCarts)

router.get('/getcarts/:id' ,cartController.getCarts)

router.put('/edit/:id', cartController.editQty)

router.delete('/dltCart/:id' , cartController.dltCart)

module.exports = router