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
            { session: false },
            (error, user, info) => {
                req.token = info.token
                return next()
            }
        )(req, res, next)
    }
}