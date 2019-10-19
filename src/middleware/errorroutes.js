const errors = require('../utils/errors')

export default function() {
    return function (ctx, next) {
        return next().then(function() {
            switch (ctx.status) {
            case 404:
                ctx.resolve.error.bind(ctx)(new errors.NotFound404())
                break
            case 500:
                ctx.resolve.error.bind(ctx)(new errors.ServerError())
                break
            }
        })
    }
}