const router = require('express').Router()
const userController = require('./user.controller')
const auth = require('../passport/auth')

router.get('/', userController.list)
router.get('/:userId', userController.getUserById)
router.post('/', userController.create)
router.put('/:userId', userController.update)
router.delete('/:userId', userController.delete)
router.post('/login', auth.local, userController.login)
router.post('/logout', auth.bearer, userController.logout)

module.exports = router