const Sequelize = require('sequelize')
var _ = require('lodash')
const validator = require('validator')
import { JobDao, DeptDao } from '../dao'

/// 获取岗位列表
export const list = async (ctx, next) => {
    // 读取参数
    let name = ctx.request.query.name
    let state = ctx.request.query.state
    // 构建查询条件
    let where = { }
    if (name) { where.name = {[Sequelize.Op.like]: '%' + name + '%'} }
    if (state) { where.state = state }
    // 查询数据
    let {results, count} = await JobDao.job_list(where, ctx)
    
    ctx.resolve.json.bind(ctx)(results, '操作成功', count)
}

/// 新增岗位
export const add = async (ctx, next) => {
    // 读取参数
    let name = ctx.request.query.name
    let dept = ctx.request.query.dept*1
    let sort = ctx.request.query.sort*1
    // 参数验证
    if (!name || !dept || !sort) {  throw new global.errs.ParamsIllegal() }
    if (validator.isEmpty(name, { ignore_whitespace: true })) { throw new global.errs.ParamsIllegal() }
    // 验证部门
    if (!(await DeptDao.dept_exists({id: dept}))) {
        throw new global.errs.ParamsIllegal("请选择正确的部门")
    }
    // 判断重名
    if (await JobDao.job_exists({name, dept_id: dept})) {
        throw new global.errs.Exists("岗位已存在")
    }
    
    await JobDao.job_add(name, dept, sort)

    ctx.resolve.success.bind(ctx)("成功添加岗位")
}

/// 编辑岗位
export const edit = async (ctx, next) => {
    // 读取参数
    let id = ctx.request.query.id*1
    let name = ctx.request.query.name
    let dept = ctx.request.query.dept*1
    let sort = ctx.request.query.sort*1
    // 参数验证
    if (!id || !name || !dept || !sort) {  throw new global.errs.ParamsIllegal() }
    if (validator.isEmpty(name, { ignore_whitespace: true })) { throw new global.errs.ParamsIllegal() }
    // 验证部门
    if (!(await DeptDao.dept_exists({id: dept}))) {
        throw new global.errs.ParamsIllegal("请选择正确的部门")
    }
    // 验证岗位
    if (!(await JobDao.job_exists({id}))) {
        throw new global.errs.NotFound("要编辑的岗位不存在")
    }
    // 判断重名
    if (await JobDao.job_exists({name, dept_id: dept})) {
        throw new global.errs.Exists("已存在同名的岗位")
    }
    
    await JobDao.job_edit(id, name, dept, sort)

    ctx.resolve.success.bind(ctx)("编辑岗位成功")
}

/// 删除岗位
export const del = async (ctx, next) => {
    // 读取参数
    let id = ctx.request.query.id*1
    // 参数验证
    if (!id) { throw new global.errs.ParamsIllegal() }
    // 验证岗位
    if (!(await JobDao.job_exists({id}))) {
        throw new global.errs.NotFound("要删除的岗位不存在")
    }
    await JobDao.validate_job_del(id)
    
    await JobDao.job_del(id)

    ctx.resolve.success.bind(ctx)("岗位删除成功")
}