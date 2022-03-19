const sequelize = require('./sequelize-instance')

sequelize.sync()
    .then(() => { console.log('Table created') })
    .catch(() => { console.log('Failed when creating table') })