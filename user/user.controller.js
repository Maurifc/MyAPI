const jwt = require('jsonwebtoken')
require('dotenv').config()
const InvalidFieldError = require('../error/InvalidFieldError')
const UserNotFoundError = require('../error/UserNotFoundError')
const user = require('./user.js')

module.exports = {
    login: (req, res) => {
        const payload = req.user.id // Injected on LocalStrategy setup
        const secret = process.env.SECRET // get SECRET from .env file

        const token = jwt.sign(payload, secret)

        res.set('Authorization', token) // Set header 'Authorization' with the login token
        res.status(204).send()
    },
    
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

    create: async (req, res, next) => {
        try {
            const data = req.body
            await user.create(data)          
    
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