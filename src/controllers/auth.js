import User from '../models/user'
import Role from '../models/role'
import Users_Roles from '../models/users_roles'
import { getToken } from '../utils'
import { roles } from '../middleware/permissions'
const UUID = require('uuid')

/// 登录
export const signin = async (ctx, next) => {
    const name = ctx.request.query.name
    const password = ctx.request.query.password

    if (!name || !password) {
        throw new global.errs.ParamsIllegal()
    }

    let _user = await User.findOne({
        where: {
            name: name
        }
    })
    if (!_user) {
        throw new global.errs.NotFound('用户不存在')
    }

    let user = await User.findOne({
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

    const token = getToken(
        {
            id: user.id,
            name: name,
            roleid: userRole.dataValues.Roles[0].id
        }
    )

    ctx.header.authorization = 'Bearer ' + token
    ctx.set('Authorization', `Bearer ${token}`)
                        
    ctx.resolve.success.bind(ctx)(token)
}

/// 注册
export const signup = async (ctx, next) => {
    const name = ctx.request.query.name
    const password = ctx.request.query.password
    const roleid = ctx.request.query.roleid

    if (!name || !password || !roleid) {
        throw new global.errs.ParamsIllegal()
    }

    if (!(roleid in roles.map(r => r.id))) {
        throw new global.errs.ParamsIllegal()
    }

    let _user = await User.findOne({
        where: {
            name: name
        }
    })
    if (_user) {
        throw new global.errs.Exists('用户已存在')
    }

    let user = new User()
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

    ctx.header.authorization = 'Bearer ' + token
    ctx.set('Authorization', `Bearer ${token}`)

    ctx.resolve.success.bind(ctx)(token)
}

export const check = async (ctx, next) => {
    ctx.resolve.success.bind(ctx)("验证成功")
}