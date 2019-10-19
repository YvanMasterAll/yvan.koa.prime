import utils from '../utils'
import { AuthDao, UserDao, RedisDao } from '../dao'
var _ = require('lodash')
import { iError } from '../utils/errors'

/// koaJwt钩子
const isRevoked = async (ctx, token, json) => {
    // console.log(ctx.headers.authorization)
    let user = utils.getJWTPayload("Bearer " + json)
    // 判断用户是否已经登出
    if (!(await RedisDao.user_tokened_get(user.id))) {
        throw new global.errs.AuthFailed("用户已经登出")
    }

    ctx.state.user = user // 保存用户信息

    return Promise.resolve(false)
}

/// 读取用户权限
const permsread = function () {
    return async function (ctx, next) {
        // 保存登录用户信息
        if (ctx.state.user) {
            try {
                let user = ctx.state.user
                // 日志信息
                ctx.request_log.name = user.name
                // TODO: 判断用户状态是否正常
                // 读取角色权限
                user.roles = await AuthDao.user_roles(user.id)
                user.roleids = user.roles.map(r => r.id)
                user.perms = await AuthDao.roles_permissions(user.roleids)
                if (await UserDao.isAdmin(null, user.roleids, user.perms)) { // 超级管理员
                    user.isadmin = true
                }
                // 权限范围和角色级别
                let scopes = user.roles.map(d => d.scope)
                let scope = global.enums.scope.same
                let level = 0
                user.roles.forEach(d => { if (d.level > level) { level = d.level }})
                scopes.forEach(d => {
                    if (d === global.enums.scope.all) {
                        scope = global.enums.scope.all
                        return false
                    } else if (d === global.enums.scope.diy) {
                        scope = global.enums.scope.diy
                    }
                })
                user.scope = scope
                user.level = level

                ctx.state._user = user
            } catch (error) { 
                console.log(error)
                if (error instanceof iError) {
                    throw error
                }
                // throw error
                // TODO: 判断错误类型是否为超时, 根据情况决定是否刷新token
            }
        }

        return next()
    }
}

/// 权限验证
const permissionCheck = function (route) {
    return async (ctx, next) => {
        if (!route.meta.auth) { return next() }

        const { perms, isadmin } = ctx.state._user
        if (isadmin) { // 超级管理员
            return next()
        }
        
        let path = route.path.replace(global.config.app.prefix, '') // 去除前缀
        let cool = perms.some(p => {
            return p.path === path
            // return p.path === path || path.startWith(p.path)
        })
        
        if (!cool) {
            throw new global.errs.NoPermission("缺少访问的权限")
        }
        
        return next()
    }
}

export {
    permsread,
    permissionCheck,
    isRevoked
}