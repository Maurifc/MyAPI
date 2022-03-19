const app = require('./app') // Get app setup up on app.js file
const userRouter = require('./user/user.router') // Import routes to /user
const sequelize = require('./db/sequelize-instance')
const port = 3000

// Routes
app.use('/user', userRouter) // Forward every /user route to userRouter

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

app.listen(port, () => console.log('App is listening on port ' + port))