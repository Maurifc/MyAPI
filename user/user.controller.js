const User = require('./user.model')


// TODO: Move to another file
function validate(userData){
    const field = ['userName', 'password', 'bornDate']

    field.forEach((field) => {
        const value = userData[field]

        if(typeof value !== 'string' || value.length === 0)
            throw new Error('Invalid field ' + field)
    })
}

module.exports = {
    list: async (req, res) => {
        const users = await User.findAll({ raw: true})
        
        res.status(200)
        res.json(users)
    },

    getUserById: async(req, res) => {
        try {
            const userId = req.params.userId
            const user = await User.findByPk(userId)

            if(user === null)
                throw new Error('Invalid user ID')

            res.json(user)
        } catch (error) {
            res.status(404)
            res.send()
        }
    },

    create: (req, res) => {
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
            res.status(400).json({ error: error.message })
        }
    },

    update: async (req, res) => {
        try {
            const userId = req.params.userId
            const data = req.body
            const user = await User.findByPk(userId)

            if(user === null)
                throw new Error('Invalid user ID')
                        
            await User.update(data, {
                where: {
                    id: userId
                }
            })

            res.status(204).send()
        } catch (error) {
            res.status(400).send()
        }
    },

    delete: async(req, res) => {
        try {
            const userId = req.params.userId
            const user = await User.findByPk(userId)
    
            if(user === null)
                throw new Error('Invalid user ID')
    
            await User.destroy({
                where: {
                   id: userId 
                }
            })
    
            res.status(204).send()            
        } catch (error) {
            res.status(404).send()            
        }
    }

}