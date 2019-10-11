import { User, Role, Users_Roles } from '../models'
import utils from '../utils'
import AuthDao from '../dao/auth'
const UUID = require('uuid')

/// 登录
export const signin = async (ctx, next) => {
    const name = ctx.request.query.name
    const password = ctx.request.query.password

    if (!name || !password) {
        throw new global.errs.ParamsIllegal()
    }

    let user = (await User.findOne({
        where: {
            name: name, 
            ...global.enums.where
        },
        raw: true
    }))

    if (!user) {
        throw new global.errs.NotFound('用户不存在')
    }

    user = await User.findOne({
        where: {
            name: name,
            password: password,
            ...global.enums.where
        },
        raw: true
    })
    if (!user) {
        throw new global.errs.PasswordWrong('用户密码不正确')
    }

    // 角色信息
    let userRoles = (await AuthDao.roles_permissions(user.id)).map(d => {
        return {
            ...d.Role, permissions: d.Roles_Permissions.map(d => d.Permission)
        }
    })

    if (!userRoles || userRoles.length === 0) {
        throw new global.errs.UserRoleNoMatch('用户角色不匹配')
    }

    // 角色权限
    let perms = userRoles.map(d => d.permissions).flatMap(d => d)
    perms = await AuthDao.sortPermissions(perms)

    // 菜单权限
    let menus = (await AuthDao.menus(userRoles.map(d => d.id))).map(d => {
        return {
            ...d.Menu, role_id: d.Role.id
        }
    })

    delete user.password
    user.roles = userRoles
    user.menus = menus
    user.perms = perms

    // 生成token
    let token = utils.getToken({
        // id: user.id, name: user.name, roleids: user.roles.map(d => d.id)
        id: user.id, name: user.name
    })
    let token_exp = utils.getJWTPayload('Bearer ' + token)

    ctx.header.authorization = 'Bearer ' + token
    ctx.set('Authorization', `Bearer ${token}`)

    ctx.resolve.json.bind(ctx)({...user, exp: token_exp.exp, iat: token_exp.iat}, token)
}

export const check = async (ctx, next) => {
    ctx.resolve.success.bind(ctx)("验证成功")
}