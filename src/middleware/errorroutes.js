const errors = require('../utils/errors')

module.exports = function() {
    return function (ctx, next) {
        switch (ctx.status) {
            case 404:
                ctx.resolve.error.bind(ctx)(new errors.NotFound404())
                break
            case 500:
                ctx.resolve.error.bind(ctx)(new errors.ServerError())
                break
            }
        return next()
    }
}