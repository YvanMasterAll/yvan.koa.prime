import utils from '../utils'
import AuthDao from '../dao/auth'
var _ = require('lodash')

/// 读取用户权限
const permsread = function () {
    return async function (ctx, next) {
        // 保存登录用户信息
        if (ctx.headers.authorization) {
            try {
                let user = utils.getJWTPayload(ctx.headers.authorization)
                // TODO: 判断用户状态是否正常
                // 读取角色权限
                user.roles = await AuthDao.roles(user.id)
                user.roleids = user.roles.map(d => d.id)
                user.perms = await AuthDao.permissions(user.roleids, user.id)
                if (user.perms.filter(d => d.id === 1).length > 0 && user.roleids.filter(d => d === 1).length > 0) { // 超级管理员
                    user.isadmin = true
                }
                // 部门权限和角色级别
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
        
        let path = route.path.replace('/api/', '')
        let pass = false
        perms.forEach(d => {
            let _path = _.lowerCase(d.path)
            if (_path === path || path.startWith(_path)) {
                pass = true
            }
        })
        
        if (!pass) {
            throw new global.errs.NoPermission()
        }
        
        return next()
    }
}

module.exports = {
    permsread,
    permissionCheck
}