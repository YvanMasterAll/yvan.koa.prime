import { User, Users_Roles, Role, Dept, Job } from '../models'
import { UserDao } from '../dao'
const { doTransaction } = require('../utils/db')
const validator = require('validator')
import utils from '../utils'
const Sequelize = require('sequelize')
var _ = require('lodash')

/// 获取用户列表
export const list = async (ctx, next) => {
    let { scope, isadmin, roleids, level } = ctx.state._user
    // 读取参数
    let name = ctx.request.query.name
    let state = ctx.request.query.state
    let dept = ctx.request.query.dept*1
    // 构建查询条件
    let where = { user: { }, role: { } }
    if (name) { where.user.name = {[Sequelize.Op.like]: name + '%'} }
    if (state) { where.user.state = state }

    await UserDao.where_user(where, dept, isadmin, scope, roleids)

    // 开始查询
    let { users, count } = await UserDao.user_list(where, ctx)

    ctx.resolve.json.bind(ctx)(users, '操作成功', count)
}

/// 添加用户
// TODO: 添加用户要在部门上做约束, 不能超出自己的部门权限范围
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
    let _roleids = ctx.getarray('roles')
    // 参数验证
    if (!name || !password || !state || !phone || !email || !dept || !job || !_roleids) { 
        throw new global.errs.ParamsIllegal()
    }
    let roleids = _roleids.map(d => d*1)
    if (validator.isEmpty(name, { ignore_whitespace: true }) || validator.isEmpty(password, { ignore_whitespace: true }) || !(utils.stateValid(global.enums.state, state))) {
        throw new global.errs.ParamsIllegal()
    }
    if (!validator.isMobilePhone(phone, "zh-CN")) { throw new global.errs.ParamsIllegal("请输入合法的电话号码") }
    if (!validator.isEmail(email)) { throw new global.errs.ParamsIllegal("请输入合法的邮箱地址") }
    await UserDao.validate_dept(dept)
    await UserDao.validate_job(job, dept)
    await UserDao.validate_roles(roleids, isadmin, level)
    // 开始事务
    await UserDao.user_add({name, password, state, phone, email, dept, job})

    ctx.resolve.success.bind(ctx)("成功添加用户")
}

/// 编辑用户
// TODO: 编辑用户要在部门上做约束, 不能超出自己的部门权限范围
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
    let _roleids = ctx.getarray('roles')
    // 参数验证
    if (!id || !name || !state || !phone || !email || !dept || !job || !_roleids) { 
        throw new global.errs.ParamsIllegal()
    }
    let roleids = _roleids.map(d => d*1)
    if (validator.isEmpty(name, { ignore_whitespace: true }) || !(utils.stateValid(global.enums.state, state))) {
        throw new global.errs.ParamsIllegal()
    }
    if (!validator.isMobilePhone(phone, "zh-CN")) { throw new global.errs.ParamsIllegal("请输入合法的电话号码") }
    if (!validator.isEmail(email)) { throw new global.errs.ParamsIllegal("请输入合法的邮箱地址") }
    await UserDao.validate_user(id, isadmin, ctx.state._user.scope, ctx.state._user.roleids)
    await UserDao.validate_dept(dept)
    await UserDao.validate_job(job, dept)
    await UserDao.validate_roles(roleids, isadmin, level)

    // 开始事务
    let params = {
        name: name, email: email, phone: phone, dept_id: dept, job_id: job, state: state, 
        update_at: new Date() // 更新时间
    }
    await UserDao.user_edit(params, password, roleids)

    ctx.resolve.success.bind(ctx)("用户编辑成功")
}

/// 删除用户
export const del = async (ctx, next) => {
    let { isadmin, scope, roleids } = ctx.state._user
    // 读取参数
    let id = ctx.request.query.id*1
    if (!id) { throw new global.errs.ParamsIllegal() }
    if (ctx.state._user.id === id) { // 自己不能删除自己
        throw new global.errs.ParamsIllegal("不能删除用户本身")
    }
    // 验证用户
    await UserDao.validate_user(id, isadmin, scope, roleids)

    // 开始事务
    await UserDao.user_del(id)

    ctx.resolve.success.bind(ctx)("用户删除成功")
}