const router = require('express').Router()
const userController = require('./user.controller')


router.get('/', userController.list)
router.post('/', userController.create)

module.exports = router