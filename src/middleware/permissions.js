import { getJWTPayload } from '../utils'

/// 权限类型
const ptype = {
    menu: 'menu',           // 菜单权限
    resource: 'resource',   // 资源权限
    feature: 'feature'      // 功能权限
}

const permissions = [
    {
        id: 101, name: '超管', type: ptype.feature // 具备管理所有用户的权力
    },
    {
        id: 102, name: '管理', type: ptype.feature // 具备管理成员的权力
    },
    {
        id: 201, name: '监控', type: ptype.menu
    },
    {
        id: 202, name: '图表', type: ptype.menu
    },
    {
        id: 203, name: '表格', type: ptype.menu
    },
    {
        id: 204, name: '列表', type: ptype.menu
    },
    {
        id: 205, name: '内容', type: ptype.menu
    },
    {
        id: 206, name: '结果', type: ptype.menu
    },
    {
        id: 207, name: '异常', type: ptype.menu
    }
]

/// 角色类型
const roles = [
    {
        id: 0,
        name: '超级管理员',
        remark: '最高权限拥有者',
        perms: getPerms()
    },
    {
        id: 1,
        name: '管理员',
        remark: '普通管理员身份',
        perms: getPerms([101])
    },
    {
        id: 2,
        name: '成员',
        remark: '普通成员',
        perms: getPerms([101, 102])
    }
]

function getPerms(exclude) {
    if (!exclude) {
        return permissions
    }

    let perms = []
    permissions.forEach(p => {
        if (exclude.includes(p.id)) {
            return
        }
        perms.push(p)
    })

    return perms
}

/// 权限读取
const _permissions = function () {
    return function (ctx, next) {
        // 保存登录用户信息
        if (ctx.headers.authorization) {
            try {
                let user = getJWTPayload(ctx.headers.authorization)
                let roleid = user.roleid
                let role = roles.filter(r => r.id === roleid)[0]
                if (!role) {
                    throw new global.errs.UserRoleUnMatch()
                }
                user.role = role
                ctx.state.user = user
            } catch (error) { 
                throw error
                // TODO: 判断错误类型是否为超时, 根据情况决定是否刷新token
            }
        }

        return next()
    }
}

/// 权限验证
const permissionCheck = function (include) {
    return async (ctx, next) => {
        const { role } = ctx.state.user
        let perms = role.perms.map(r => r.id)
        let pass = true
        include.forEach(p => {
            if (perms.includes(p)) {
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
    _permissions,
    permissionCheck,
    roles,
    permissions
}