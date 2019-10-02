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
            name: name
        },
        raw: true
    }))

    if (!user) {
        throw new global.errs.NotFound('用户不存在')
    }

    user = await User.findOne({
        where: {
            name: name,
            password: password
        },
        raw: true
    })
    if (!user) {
        throw new global.errs.PasswordWrong('用户密码不正确')
    }

    // 角色信息
    let userRoles = (await AuthDao.roles(user.id)).map(d => {
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
        id: user.id, name: user.name, roleids: user.roles.map(d => d.id)
    })
    let token_exp = utils.getJWTPayload('Bearer ' + token)

    ctx.header.authorization = 'Bearer ' + token
    ctx.set('Authorization', `Bearer ${token}`)

    ctx.resolve.json.bind(ctx)({...user, exp: token_exp.exp, iat: token_exp.iat}, token)
}

/// 注册
export const signup = async (ctx, next) => {
    const name = ctx.request.query.name
    const password = ctx.request.query.password
    const roleid = ctx.request.query.roleid

    if (!name || !password || !roleid) {
        throw new global.errs.ParamsIllegal()
    }

    let role = roles.filter(r => r.id === roleid*1)[0]
    if (!role) {
        throw new global.errs.ParamsIllegal()
    }

    let user = await User.findOne({
        where: {
            name: name
        }
    })
    if (user) {
        throw new global.errs.Exists('用户已存在')
    }

    user = new User()
    let userid = UUID.v1()
    user.id = userid
    user.name = name
    user.password = password
    await user.save()

    let ur = new Users_Roles()
    ur.id = UUID.v1()
    ur.userid = userid
    ur.roleid = roleid
    await ur.save()

    // 生成token
    const token = utils.getToken(
        {
            id: user.id,
            name: name,
            roleid: roleid
        }
    )

    // 整理数据
    let _user = Object.assign({}, user.dataValues)
    delete _user.password
    _user.role = Object.assign({}, role)
    _user.perms = role.perms.map(r => r.id)
    delete _user.role.perms
    let _token = utils.getJWTPayload('Bearer ' + token)
    _user.token = _token

    // 将token放入响应头
    ctx.header.authorization = 'Bearer ' + token
    ctx.set('Authorization', `Bearer ${token}`)

    ctx.resolve.json.bind(ctx)(_user, token)
}

export const check = async (ctx, next) => {
    ctx.resolve.success.bind(ctx)("验证成功")
}