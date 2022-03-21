const passport = require('passport')

module.exports = {
    local: (req, res, next) => {
        passport.authenticate(
            'local',
            { session: false }
        )(req, res, next)
    },
    bearer: (req, res, next) => {
        passport.authenticate(
            'bearer',
            { session: false }
        )(req, res, next)
    }
}