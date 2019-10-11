import { User, Users_Roles, Role, Dept, Job } from '../models'
import UserDao from '../dao/user'
import CommonDao from '../dao/common'
const Sequelize = require('sequelize')
const { doTransaction } = require('../utils/db')
const validator = require('validator')
import utils from '../utils'
var _ = require('lodash')

/// 获取用户列表
export const list = async (ctx, next) => {
    let { scope, isadmin, roleids, level } = ctx.state._user
    // 读取参数
    let name = ctx.request.query.name
    let state = ctx.request.query.state
    let dept = ctx.request.query.dept
    // 构建查询条件
    let where = { user: { }, role: { } }
    if (name) { where.user.name = name }
    if (state) { where.user.state = state }

    if (!isadmin && scope !== global.enums.scope.all) { // 如果是管理员或者部门权限为all则不添加查询约束
        if (scope ===  global.enums.scope.same) {
            where.role.level = { [Sequelize.Op.gt]: level } // 角色级别约束
        } 
        if (scope === global.enums.scope.diy) {
            // 查询部门权限
            let deptids = (await UserDao.depts(roleids)).map(d => d.dept_id)
            let depts = await CommonDao.depts_children(deptids)
            if (dept) {
                let _depts = []
                (await CommonDao.depts_children([dept])).forEach(d => {
                    if (depts.filter(d2 => d2.id === d.id)) {
                        _depts.push(d)
                    }
                })
                if (_depts.length === 0) { // 如果没有部门权限直接返回空
                    return ctx.resolve.json.bind(ctx)([])
                }
                where.user.dept_id = { [Sequelize.Op.in]: _depts.map(d => d.id) }
            } else {
                where.user.dept_id = { [Sequelize.Op.in]: depts.map(d => d.id) }
            }
        }
    }

    /// 开始查询
    let results = (await Users_Roles.findAll({
        include: [{
            model: User,
            required: true,
            where: { ...global.enums.where, ...where.user },
            attributes: { exclude: ['password'] }
        }, {
            model: Role,
            required: true,
            where: { ...global.enums.where, ...where.role }
        }], where: { ...global.enums.where }
    })).map(d => {
        return d.toJSON()
    }).map(d => d.User)

    ctx.resolve.json.bind(ctx)(results)
}

/// 添加用户
export const add = async (ctx, next) => {
    let { isadmin, level } = ctx.state._user
    // 读取参数
    let name = ctx.request.query.name
    let password = ctx.request.query.password
    let state = ctx.request.query.state
    let phone = ctx.request.query.phone
    let email = ctx.request.query.email
    let dept = ctx.request.query.dept*1
    let job = ctx.request.query.job*1
    let _roleids = ctx.request.query.roles
    // 参数验证
    if (!name || !password || !state || !phone || !email || !dept || !job || !_roleids) { 
        throw new global.errs.ParamsIllegal()
    }
    let roleids = _roleids.split('|').map(d => d*1)
    if (validator.isEmpty(name, { ignore_whitespace: true }) || validator.isEmpty(password, { ignore_whitespace: true }) || !(utils.stateValid(global.enums.state, state))) {
        throw new global.errs.ParamsIllegal()
    }
    if (!validator.isMobilePhone(phone, "zh-CN")) { throw new global.errs.ParamsIllegal("请输入合法的电话号码") }
    if (!validator.isEmail(email)) { throw new global.errs.ParamsIllegal("请输入合法的邮箱地址") }
    let _dept = (await Dept.findOne({
        where: {
            id: dept, 
            ...global.enums.where
        },
        raw: true
    }))
    if (!_dept) { throw new global.errs.ParamsIllegal("请选择正确的部门") }
    let _job = (await Job.findOne({
        where: {
            id: job, 
            dept_id: dept,
            ...global.enums.where
        },
        raw: true
    }))
    if (!_job) { throw new global.errs.ParamsIllegal("请选择正确的岗位·") }
    // 判断角色
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

    // 开始事务
    doTransaction(async function(transaction) {
        // 添加用户
        let user = new User()
        user.name = name,
        user.password = password,
        user.avatar = global.config.db.avatar,
        user.email = email,
        user.phone = phone,
        user.dept_id = dept,
        user.job_id = job,
        user.state = state
        await user.save({transaction}).then(async function (user) {
            // 添加角色
            roleids.forEach(async d => {
                let ur = new Users_Roles()
                ur.user_id = user.id
                ur.role_id = d
                await ur.save({transaction})
            })
        })
    }, () => { throw new global.errs.DBError("数据库操作异常") })

    ctx.resolve.success.bind(ctx)("成功添加用户")
}

/// 编辑用户
export const edit = async (ctx, next) => {
    let { isadmin, level } = ctx.state._user
    // 读取参数
    let id = ctx.request.query.id*1
    let name = ctx.request.query.name
    let password = ctx.request.query.password
    let state = ctx.request.query.state
    let phone = ctx.request.query.phone
    let email = ctx.request.query.email
    let dept = ctx.request.query.dept*1
    let job = ctx.request.query.job*1
    let _roleids = ctx.request.query.roles
    // 参数验证
    if (!id || !name || !password || !state || !phone || !email || !dept || !job || !_roleids) { 
        throw new global.errs.ParamsIllegal()
    }
    let roleids = _roleids.split('|').map(d => d*1)
    if (validator.isEmpty(name, { ignore_whitespace: true }) || validator.isEmpty(password, { ignore_whitespace: true }) || !(utils.stateValid(global.enums.state, state))) {
        throw new global.errs.ParamsIllegal()
    }
    if (!validator.isMobilePhone(phone, "zh-CN")) { throw new global.errs.ParamsIllegal("请输入合法的电话号码") }
    if (!validator.isEmail(email)) { throw new global.errs.ParamsIllegal("请输入合法的邮箱地址") }
    // 判断用户
    let user = (await User.findOne({
        where: {
            id: id, 
            // ...global.enums.where // 编辑的用户不需要判断状态
        },
        raw: true
    }))
    if (!user) { throw new global.errs.ParamsIllegal("编辑的用户不存在") }
    let _dept = (await Dept.findOne({
        where: {
            id: dept, 
            ...global.enums.where
        },
        raw: true
    }))
    if (!_dept) { throw new global.errs.ParamsIllegal("请选择正确的部门") }
    let _job = (await Job.findOne({
        where: {
            id: job, 
            dept_id: dept,
            ...global.enums.where
        },
        raw: true
    }))
    if (!_job) { throw new global.errs.ParamsIllegal("请选择正确的岗位·") }
    // 判断角色
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
    // 查询角色
    let current_roleids = (await Users_Roles.findAll({
        where: {
            user_id: id,
            ...global.enums.where
        }
    })).map(d => d.toJSON()).map(d => d.role_id)

    // 开始事务
    doTransaction(async function(transaction) {
        // 更新用户
        user.name = name,
        user.password = password,
        user.avatar = global.config.db.avatar,
        user.email = email,
        user.phone = phone,
        user.dept_id = dept,
        user.job_id = job,
        user.state = state
        user.update_at = new Date() // 更新时间
        await user.save({transaction})
        // 更新角色
        roleids.forEach(d => {
            if (current_roleids.indexOf(d) === -1) {
                // 添加角色
                let ur = new Users_Roles()
                ur.user_id = id
                ur.role_id = d
                await ur.save({transaction})
            }
        })
        current_roleids.forEach(d => {
            if (roleids.indexOf(d) === -1) {
                // 删除角色
                let ur = new Users_Roles()
                ur.id = d
                ur.update_at = new Date()
                ur.state = global.enums.state.off
                await ur.save({attributes: ["state"]}, {transaction})
            }
        })

    }, () => { throw new global.errs.DBError("数据库操作异常") })

    ctx.resolve.success.bind(ctx)("成功添加用户")
}