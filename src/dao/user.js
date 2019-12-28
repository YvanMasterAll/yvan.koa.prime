import { Roles_Depts, Dept, Job, User, Users_Roles, Role } from '../models'
import CommonDao from './common'
const { doTransaction } = require('../utils/db')
const Sequelize = require('sequelize')

class UserDao {

    /// 获取部门权限
    static async roles_depts(roleids) {
        return (await Roles_Depts.findAll({
            where: {
                role_id: {
                    [Sequelize.Op.in]: roleids
                },
                ...global.enums.where
            }
        })).map(d => {
            return d.toJSON()
        })
    }

    /// 验证角色有效性
    static async validate_roles(roleids, isadmin, level) {
        let roles = await CommonDao.roles()
        let roles_state = true
        roleids.forEach(r => {
            let role = roles.filter(d => d.id === r)[0]
            if (!role) {
                roles_state = false
                return false
            } else {
                if (!isadmin && level >= role.level) { // 添加的角色级别不能高于用户本身
                    roles_state = false
                    return false
                } 
            }
        })
        if (!roles_state) { throw new global.errs.ParamsIllegal("请选择正确的角色") }
    }

    /// 获取用户角色
    static async user_roles(id) {
        return (await Users_Roles.findAll({
            where: {
                user_id: id,
                ...global.enums.where
            }
        })).map(d => d.toJSON()).map(d => d.role_id)
    }

    /// 判断用户是否为超管
    // TODO: 这里的判断还不够严谨, 仅仅判断id为1的角色就是超管, 因为超管这个角色是不能更改的, 所以权限这里没有判断
    static async isAdmin(id, roleids, perms) {
        if (!roleids) {
            roleids = await this.user_roles(id)
        }
        if (perms) {
            if (perms.filter(d => d.id === 1).length > 0 && roleids.filter(d => d === 1).length > 0) {
                return true
            }
        } else {
            if (roleids.filter(d => d === 1).length > 0) {
                return true
            }
        }

        return false
    }

    /// 判断权限是否是超管权限
    static isAdminPermission(id) {
        return id === 1
    }

    /// 判断角色是否是超管角色
    static isAdminRole(id) {
        return id === 1
    }

    /// 判断用户是否拥有处理工单的权限
    static isTicketExecutor(perms) {
        return perms.filter(p => p.id === 61).length > 0
    }

    /// 判断用户是否拥有工单管理的权限
    static isTicketManager(perms) {
        return perms.filter(p => p.id === 62).length > 0
    }

    /// 验证用户有效性
    static async validate_user(id, isadmin, scope, roleids) {
        if (!roleids) { // 验证用户是否存在
            let user = (await User.findOne({
                where: {
                    id: id, 
                    ...global.enums._where
                },
                raw: true
            }))
            if (!user) { throw new global.errs.ParamsIllegal("要操作的用户不存在") }

            return
        }
        // 只有超管才能操作超管
        let _isadmin = await this.isAdmin(id)
        if (!isadmin && _isadmin) {
            throw new global.errs.NoPermission("操作权限不够")
        }
        // 精确验证, 需要验证用户级别和部门权限
        let where = {user: { id: id }}
        await this.where_user(where, null, isadmin, scope, roleids)

        let user = await Users_Roles.findOne({
            include: [{
                model: User,
                required: true,
                where: { ...where.user, ...global.enums._where }
            }, {
                model: Role,
                required: true,
                where: { ...global.enums.where, ...where.role }
            }]
        })
        if (!user) { throw new global.errs.ParamsIllegal("要操作的用户不存在或者没有权限操作") }
    }

    /// 构建用户查询条件
    static async where_user(where, dept, isadmin, scope, roleids) {
        if (!isadmin && scope ===  global.enums.scope.same) {
            where.role.level = { [Sequelize.Op.gt]: level } // 角色级别约束
        }
        if (dept) { // 部门查询条件
            let depts = await CommonDao.depts_withChildren([dept])
            where.user.dept_id = { [Sequelize.Op.in]: depts.map(d => d.id) }
        }
        if (!isadmin && scope === global.enums.scope.diy) { // 部门约束
            // 查询部门权限, 包括子部门
            let scope_deptids = (await this.roles_depts(roleids)).map(d => d.dept_id)
            let scope_depts = await CommonDao.depts_withChildren(scope_deptids)
            let _depts = scope_depts
            if (dept) { // 部门条件
                _depts = []
                let depts = await CommonDao.depts_withChildren([dept])
                depts.forEach(d => {
                    if (scope_depts.filter(d2 => d2.id === d.id).length > 0) {
                        _depts.push(d)
                    }
                })
            }
            where.user.dept_id = { [Sequelize.Op.in]: _depts.map(d => d.id) }
        }
    }

    /// 获取用户列表
    static async user_list(where, ctx) {
        let result = (await Users_Roles.findAndCountAll({
            include: [{
                model: User,
                required: true,
                where: { ...global.enums._where, ...where.user },
                attributes: { exclude: ['password'] },
                include: [{
                    association: User.belongsTo(Dept, {foreignKey: 'dept_id', targetKey: 'id', constraints: false}),
                    required: true,
                    where: { ...global.enums.where }
                },{
                    association: User.belongsTo(Job, {foreignKey: 'job_id', targetKey: 'id', constraints: false}),
                    required: true,
                    where: { ...global.enums.where }
                }]
            }, {
                model: Role,
                required: false,
                where: { ...global.enums.where, ...where.role }
            }], where: { ...global.enums._where },
            offset: ctx.limit*ctx.pagenum,
            limit: ctx.limit,
            distinct: true // 只计算主表数量
        }))
        let count = result.count
        let results = result.rows.map(d => { return d.toJSON() }).map(d => {
            return {user: d.User, role: d.Role} 
        })
        // 去重
        let users = []
        results.forEach(r => {
            let user = users.filter(u => u.id === r.user.id)[0]
            if (user) {
                r.role && user.roles.push(r.role)
            } else {
                users.push({...r.user, roles: r.role ? [r.role]:[]})
            }
        })

        return { users, count }
    }

    /// 添加用户
    static async user_add(params, roleids) {
        await doTransaction(async function(transaction) {
            // 添加用户
            let user = new User()
            user.name = params.name,
            user.password = params.password,
            user.avatar = global.config.db.avatar,
            user.email = params.email,
            user.phone = params.phone,
            user.dept_id = params.dept,
            user.job_id = params.job,
            user.state = params.state
            await user.save({transaction}).then(async function (user) {
                // 添加用户角色
                roleids.forEach(async d => {
                    let ur = new Users_Roles()
                    ur.user_id = user.id
                    ur.role_id = d
                    await ur.save({transaction})
                })
            })
        }, () => { throw new global.errs.DBError("数据库操作异常") })
    }

    /// 编辑用户
    static async user_edit(id, params, password, roleids) {
        // 查询当前角色
        let current_roleids = (await Users_Roles.findAll({
            where: {
                user_id: id,
                ...global.enums.where
            }
        })).map(d => d.toJSON()).map(d => d.role_id)
        
        // 开始事务
        await doTransaction(async function(transaction) {
            // 更新用户
            if (password && !validator.isEmpty(password, { ignore_whitespace: true })) {
                params.password = password
            }
            await User.update(params, { where: { id: id }, transaction })
            // 更新角色
            for (var i in roleids) {
                let d = roleids[i]
                if (current_roleids.indexOf(d) === -1) {
                    // 添加用户角色
                    let ur = new Users_Roles()
                    ur.user_id = id
                    ur.role_id = d
                    await ur.save({transaction})
                }
            }
            for (var i in current_roleids) {
                let d = current_roleids[i]
                if (roleids.indexOf(d) === -1) {
                    // 删除用户角色
                    await Users_Roles.destroy({where: {user_id: id, role_id: d}, transaction})
                    // await Users_Roles.update({state: global.enums.state.del, update_at: new Date()}, {where: {user_id: id, role_id: d}, transaction})
                }
            }
        }, () => { throw new global.errs.DBError("数据库操作异常") })
    }

    /// 删除用户
    static async user_del(id) {
        await doTransaction(async function(transaction) {
            // 删除用户
            await User.update({ state: global.enums.state.del, update_at: new Date() }, { where: {id: id}, transaction })
            // 删除用户角色
            await Users_Roles.destroy({ where: {user_id: id}, transaction })
            // await Users_Roles.update({ state: global.enums.state.del, update_at: new Date() }, { where: {user_id: id}, transaction })
        }, () => { throw new global.errs.DBError("数据库操作异常") })
    }

    /// 用户信息
    static async user_profile(id) {
        let result = (await User.findOne({
            where: {id, ...global.enums.where},
            attributes: { exclude: ['password'] },
            include: [{
                association: User.belongsTo(Dept, {foreignKey: 'dept_id', targetKey: 'id', constraints: false}),
                required: true,
                where: { ...global.enums.where }
            },{
                association: User.belongsTo(Job, {foreignKey: 'job_id', targetKey: 'id', constraints: false}),
                required: true,
                where: { ...global.enums.where }
            }]
        }))
        if (result) {
            result = result.toJSON()
            result.avatar = result.avatar.toUrl()
        }
        
        return result
    }

    /// 更新用户头像
    static async update_avatar(id, path) {
        await User.update({avatar: path, update_at: new Date()}, {where: {id}})
    }
}

export default UserDao