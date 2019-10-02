import utils from '../utils'
const Sequelize = require('sequelize')
import { Role, Users_Roles, Roles_Permissions, Permission, Roles_Menus, Menu } from '../models'

/// 读取用户权限
const permsread = function () {
    return async function (ctx, next) {
        // 保存登录用户信息
        if (ctx.headers.authorization) {
            try {
                let user = utils.getJWTPayload(ctx.headers.authorization)
                // 读取角色权限
                let results = (await Roles_Permissions.findAll({
                    include: [{
                        model: Role,
                        required: true
                    }, {
                        model: Permission,
                        required: true
                    }], where: {
                        role_id: {
                            [Sequelize.Op.in]: user.roleids
                        }
                    }
                })).map(d => {
                    return d.toJSON()
                })

                let perms = results.map(d => {
                    return {...d.Permission, role_id: d.Role.id}
                })
                user.perms = perms
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
const permissionCheck = function (include) {
    return async (ctx, next) => {
        const { perms, roleids } = ctx.state._user
        if (perms.filter(d => d.id === 1) && roleids.filter(d => d.id === 1)) { // 超级管理员
            return next()
        }
        let pass = true
        include.forEach(p => {
            if (perms.filter(d => d.id === p)) {
                return
            }
            pass = false
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