const router = require('express').Router()
const userController = require('./user.controller')


router.get('/', userController.listAll)

module.exports = router