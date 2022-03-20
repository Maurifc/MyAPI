const app = require('./app') // Get app setup up on app.js file
const userRouter = require('./user/user.router') // Import routes to /user
const port = 3000

// Routes
app.use('/user', userRouter) // Forward every /user route to userRouter

app.listen(port, () => console.log('App is listening on port ' + port))