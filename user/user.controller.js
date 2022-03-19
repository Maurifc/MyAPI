const User = require('./user.model')

module.exports = {
    listAll: (req, res) => {
        const users = User.listAll()
        
        res.status(200)
        res.send(JSON.stringify(users))
    }
}