const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const user = require('../user/user')
const IncorrectUsernameOrPasswordError = require('../error/IncorrectUsernameOrPasswordError')

function checkUser(user){
    if( user === null )
        throw new IncorrectUsernameOrPasswordError()
}

async function compareUserPassword(password, passwordHash){
    const validPassword = await bcrypt.compare(password, passwordHash)
    
    if(!validPassword)
        throw new IncorrectUsernameOrPasswordError()
}

// Check if sent user/passwords matches
passport.use(
    new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password',
        session: false
    }, async (inputUserName, inputPassword, done) => {
        try {
            const u = await user.getByUsername(inputUserName)
            checkUser(u) // Check if user exists
            await compareUserPassword(inputPassword, u.password) // Check if password matches
            done(null, u)
        } catch (error) {
            done(error)
        }
    })
)