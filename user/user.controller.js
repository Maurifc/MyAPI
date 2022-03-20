const User = require('./user.model')
const InvalidFieldError = require('../error/InvalidFieldError')
const UserNotFoundError = require('../error/UserNotFoundError')


// TODO: Move to another file
function validate(userData){
    const field = ['userName', 'password', 'bornDate']

    field.forEach((field) => {
        const value = userData[field]

        if(typeof value !== 'string' || value.length === 0)
            throw new InvalidFieldError()
    })
}

module.exports = {
    list: async (req, res) => {
        const users = await User.findAll({ raw: true})
        
        res.status(200)
        res.json(users)
    },

    getUserById: async(req, res, next) => {
        try {
            const userId = req.params.userId
            const user = await User.findByPk(userId)

            if(user === null)
                throw new UserNotFoundError()

            res.json(user)
        } catch (error) {
            next(error)
        }
    },

    create: (req, res, next) => {
        try {
            const data = req.body

            validate(data)

            User.create({
                userName: data.userName,
                password: data.password,
                bornDate: data.bornDate,
            })
    
            res.send(201)            
        } catch (error) {
            next(error)
        }
    },

    update: async (req, res, next) => {
        try {
            const userId = req.params.userId
            const data = req.body
            const user = await User.findByPk(userId)

            if(user === null)
                throw new UserNotFoundError()
                
            if(Object.keys(data).length === 0)
                throw new InvalidFieldError()
                        
            await User.update(data, {
                where: {
                    id: userId
                }
            })

            res.status(204).send()
        } catch (error) {
            next(error)
        }
    },

    delete: async(req, res, next) => {
        try {
            const userId = req.params.userId
            const user = await User.findByPk(userId)
    
            if(user === null)
                throw new UserNotFoundError()
    
            await User.destroy({
                where: {
                   id: userId 
                }
            })
    
            res.status(204).send()            
        } catch (error) {
            next(error)
        }
    }
}