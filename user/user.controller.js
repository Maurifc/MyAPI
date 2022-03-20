const InvalidFieldError = require('../error/InvalidFieldError')
const UserNotFoundError = require('../error/UserNotFoundError')
const user = require('./user.js')

module.exports = {
    list: async (req, res) => {
        const users = await user.list()
        
        res.status(200)
        res.json(users)
    },

    getUserById: async(req, res, next) => {
        try {
            const userId = req.params.userId
            const u = await user.getById(userId)

            res.json(u)
        } catch (error) {
            next(error)
        }
    },

    create: (req, res, next) => {
        try {
            const data = req.body
            user.create(data)          
    
            res.status(201).send()            
        } catch (error) {
            next(error)
        }
    },

    update: async (req, res, next) => {
        try {
            const userId = req.params.userId
            const data = req.body
            
            await user.update(data, userId)

            res.status(204).send()
        } catch (error) {
            next(error)
        }
    },

    delete: async(req, res, next) => {
        try {
            const userId = req.params.userId
    
            await user.delete(userId)
    
            res.status(204).send()            
        } catch (error) {
            next(error)
        }
    }
}