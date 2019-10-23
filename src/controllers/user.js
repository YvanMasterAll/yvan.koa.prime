import { User } from '../models'
import { UserDao, CommonDao } from '../dao'
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
    await CommonDao.validate_dept(dept)
    await CommonDao.validate_job(job, dept)
    await UserDao.validate_roles(roleids, isadmin, level)
    // 开始事务
    await UserDao.user_add({name, password, state, phone, email, dept, job}, roleids)

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
    await CommonDao.validate_dept(dept)
    await CommonDao.validate_job(job, dept)
    await UserDao.validate_roles(roleids, isadmin, level)

    // 开始事务
    let params = {
        name: name, email: email, phone: phone, dept_id: dept, job_id: job, state: state, 
        update_at: new Date() // 更新时间
    }
    await UserDao.user_edit(id, params, password, roleids)

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

/// 用户信息
export const profile = async (ctx, next) => {
    let id = ctx.state._user.id
    let user = await UserDao.user_profile(id)
    if (!user) {
        throw new global.errs.NotFound("无法查找用户信息")
    }

    ctx.resolve.json.bind(ctx)(user)
}

/// 更新头像
export const update_avatar = async (ctx, next) => {
    let upload = ctx.req.file
    if (!upload) { throw new global.errs.UploadFailed() } 
    let path = upload.path.replace('assets/', '')

    await UserDao.update_avatar(ctx.state._user.id, path)
    
    ctx.resolve.json.bind(ctx)(path.toUrl(), "成功更换头像")
}

/// 更新邮箱
export const update_email = async (ctx, next) => {
    let id = ctx.state._user.id
    // 读取参数
    let password = ctx.request.query.password
    let email = ctx.request.query.email
    // 参数验证
    if (!email || !password) { throw new global.errs.ParamsIllegal() }
    if (!validator.isEmail(email)) { throw new global.errs.ParamsIllegal("请输入合法的邮箱地址") }
    // 查找用户
    let user = (await User.findOne({
        where: {id, password, ...global.enums.where},
        raw: true
    }))
    if (!user) {
        throw new global.errs.ParamsIllegal("用户密码验证失败")
    }
    // 验证信息
    if (user.email === email) {
        throw new global.errs.ParamsIllegal("要修改的邮箱和原邮箱相同")
    }
    // 更新邮箱
    await User.update({
        email: email,
        update_at: new Date()
    }, {where: {id}})

    ctx.resolve.success.bind(ctx)("成功更换邮箱")
}

/// 更新密码
export const update_password = async (ctx, next) => {
    let id = ctx.state._user.id
    // 读取参数
    let old = ctx.request.query.old
    let password = ctx.request.query.password
    // 参数验证
    if (!old || !password) { throw new global.errs.ParamsIllegal() }
    if (validator.isEmpty(password, { ignore_whitespace: true })) { throw new global.errs.ParamsIllegal("请输入规范的密码") }
    // 查找用户
    let user = (await User.findOne({
        where: {id, password: old, ...global.enums.where},
        raw: true
    }))
    if (!user) {
        throw new global.errs.ParamsIllegal("用户密码验证失败")
    }
    // 验证信息
    if (user.passowrd === password) {
        throw new global.errs.ParamsIllegal("要修改的密码和原密码相同")
    }
    // 更新邮箱
    await User.update({
        password: password,
        update_at: new Date()
    }, {where: {id}})

    ctx.resolve.success.bind(ctx)("成功更换密码")
}