import { iError } from '../utils/errors'
import resolve from '../utils/resolve'
import { BaseError } from 'sequelize'
import utils from '../utils'
import { JsonWebTokenError } from 'jsonwebtoken'

module.exports = function () {
    return function (ctx, next) {
        // 为请求上下文添加结果处理函数
        ctx.resolve = resolve
        // 计算分页数据
        utils.setpage(ctx)

        return next().catch((err) => {
            if (err instanceof iError) {
                ctx.resolve.error.bind(ctx)(err)
            } else if (err instanceof BaseError) {
                console.log(err)
                ctx.resolve.error.bind(ctx)(new global.errs.DBError("数据库操作异常:" + err))
            } else if (err instanceof JsonWebTokenError) {
                ctx.resolve.error.bind(ctx)(new global.errs.TokenError)
            } else {
                switch (err.status) { 
                    case 401:
                        ctx.resolve.error.bind(ctx)(new global.errs.AuthFailed)
                        break
                    default:
                        console.log(err)
                        ctx.resolve.error.bind(ctx)(new global.errs.Unknown)
                }
            }
        })
    }
}