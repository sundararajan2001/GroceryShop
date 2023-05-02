const groceryItemController = require('../controllers/groceryItemConteroller.js')
const auth = require('../authentication/authentication.js')
const router = require('express').Router()
let validator = require('express-joi-validation').createValidator()
const groceryValidator = require('../validator/groceryItemVal.js')

router.post('/addGrocery',validator.body(groceryValidator.groceryVal),auth.authenticateAdmin, groceryItemController.addGrocery)

router.get('/getAllGrocery',auth.authenticateUser , groceryItemController.getAllGroceryItems)

router.get('/getgroceryuser', groceryItemController.getGroceryUsers)

router.delete('/dltgrocery/:id',auth.authenticateAdmin, groceryItemController.dltGrocery)

module.exports = router


