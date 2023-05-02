const userController = require('../controllers/userControllerr.js')
const auth = require('../authentication/authentication.js')
const validator = require('express-joi-validation').createValidator({passError:false})
const userValidator = require('../validator/userVal.js')

const router = require('express').Router()

router.get('/getAllUsers',auth.authenticateAdmin ,userController.getAllUsers)

router.post('/signup', validator.body(userValidator.userVal), userController.addUser)

router.get('/allusers', auth.authenticateAdmin , userController.findAllUserss)

router.get('/alluser/:id', auth.authenticateUser, userController.findUserGrocery)


module.exports = router
