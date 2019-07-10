import User from '../models/user'
import Role from '../models/role'
import Users_Roles from '../models/users_roles'
import { getToken, getJWTPayload } from '../utils'
import { roles } from '../middleware/permissions'
const UUID = require('uuid')

/// 登录
export const signin = async (ctx, next) => {
    const name = ctx.request.query.name
    const password = ctx.request.query.password

    if (!name || !password) {
        throw new global.errs.ParamsIllegal()
    }

    let user = await User.findOne({
        where: {
            name: name
        }
    })
    if (!user) {
        throw new global.errs.NotFound('用户不存在')
    }

    user = await User.findOne({
        where: {
            name: name,
            password: password
        }
    })
    if (!user) {
        throw new global.errs.PasswordWrong('用户密码不正确')
    }

    let userRole = await User.findOne({
        include: {
            model: Role,
            required: true
        },
        where: {
            id: user.id
        }
    })

    if (!userRole || !userRole.dataValues.Roles[0]) {
        throw new global.errs.UserRoleNoMatch('用户角色不匹配')
    }

    let role = userRole.dataValues.Roles[0].dataValues
    delete role.Users_Roles

    const token = getToken(
        {
            id: user.id,
            name: name,
            roleid: role.id
        }
    )
    
    let _user = userRole.dataValues
    delete _user.password
    delete _user.Roles
    _user.role = role
    let _role = roles.filter(r => r.id === role.id)[0]
    _user.perms = _role.perms.map(r => r.id)
    let _token = getJWTPayload('Bearer ' + token)
    _user.token = _token

    // ctx.header.authorization = 'Bearer ' + token
    // ctx.set('Authorization', `Bearer ${token}`)
                        
    ctx.resolve.json.bind(ctx)(_user, token)
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

    const token = getToken(
        {
            id: user.id,
            name: name,
            roleid: roleid
        }
    )

    let _user = Object.assign({}, user.dataValues)
    delete _user.password
    _user.role = Object.assign({}, role)
    _user.perms = role.perms.map(r => r.id)
    delete _user.role.perms
    let _token = getJWTPayload('Bearer ' + token)
    _user.token = _token

    // ctx.header.authorization = 'Bearer ' + token
    // ctx.set('Authorization', `Bearer ${token}`)

    ctx.resolve.json.bind(ctx)(_user, token)
}

export const check = async (ctx, next) => {
    ctx.resolve.success.bind(ctx)("验证成功")
}