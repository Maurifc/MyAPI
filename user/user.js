const User = require('./user.model')
const InvalidFieldError = require('../error/InvalidFieldError')
const UserNotFoundError = require('../error/UserNotFoundError')

function validate(userData){
    const field = ['userName', 'password', 'bornDate']

    field.forEach((field) => {
        const value = userData[field]

        if(typeof value !== 'string' || value.length === 0)
            throw new InvalidFieldError()
    })
}

module.exports = {
    list: async () => {
        return await User.findAll()
    },

    getById: async (userId) => {
        const user = await User.findByPk(userId)

        if(user === null)
            throw new UserNotFoundError()
        
        return user
    },

    create: (userData) => {
        validate(userData)

        User.create({
            userName: userData.userName,
            password: userData.password,
            bornDate: userData.bornDate,
        })
    },

    update: async (userData, userId) => {
        const user = await User.findByPk(userId)

        if(user === null)
            throw new UserNotFoundError()
            
        if(Object.keys(userData).length === 0)
            throw new InvalidFieldError()
                    
        await User.update(userData, {
            where: {
                id: userId
            }
        })
    },

    delete: async(userId) => {
        const user = await User.findByPk(userId)
        
        if(user === null)
            throw new UserNotFoundError()

        await User.destroy({
            where: {
                id: userId 
            }
        })
    }
}