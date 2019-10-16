import { iError } from '../utils/errors'
import resolve from '../utils/resolve'
import { BaseError } from 'sequelize'
import utils from '../utils'
import { JsonWebTokenError } from 'jsonwebtoken'
import { Log } from '../models'
import { RedisDao } from '../dao'

module.exports = function () {
    return function (ctx, next) {
        // 为请求上下文添加结果处理函数
        ctx.resolve = resolve
        ctx.getarray = utils.getArrayParam
        // 日志记录
        ctx.request_log = new Log()
        if (ctx.request.ips.length > 0) {
            ctx.request_log.request_ip = ctx.request.ips[0]
        } else {
            ctx.request_log.request_ip = ctx.request.ip
        }
        ctx.request_log.params = JSON.stringify(ctx.request.query)
        ctx.request_log.method = ctx.request.method
        ctx.request_log.create_at = new Date()
        // 计算分页数据
        utils.setpage(ctx)

        return next().then(function() {
            if (ctx.request_log.description) { // 记录操作日志
                ctx.request_log.type = ctx.status === 200 ? 'success':'failed'
                ctx.request_log.time = new Date().getTime() - ctx.request_log.create_at.getTime()
                ctx.request_log.save() 
            }
            if (ctx.recache) { // 重置缓存, 当前还是在测试阶段
                ctx.recache.forEach(key => { 
                    console.log('正在重置缓存: ' + key)
                    RedisDao.timeline_reset(key)
                })
            }
        }).catch((err) => {
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
            // 记录异常日志
            if (ctx.request_log.description) {
                ctx.request_log.type = 'error'
                ctx.request_log.exception_detail = err
                ctx.request_log.time = new Date().getTime() - ctx.request_log.create_at.getTime()
                ctx.request_log.save()
            }
        })
    }
}