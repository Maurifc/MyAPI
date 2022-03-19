const User = require('./user.model')

module.exports = {
    list: async (req, res) => {
        const users = await User.findAll({ raw: true})
        
        res.status(200)
        res.json(users)
    },

    create: (req, res) => {
        const data = req.body

        User.create({
            userName: data.userName,
            password: data.password,
            bornDate: data.bornDate,
        })

        res.send(201)
    }
}