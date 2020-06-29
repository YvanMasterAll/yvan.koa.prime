const Sequelize = require('sequelize')
var _ = require('lodash')
const validator = require('validator')
import { DeptDao, CommonDao } from '../dao'

/// 获取部门列表
export const list = async (ctx, next) => {
    // 读取参数
    let name = ctx.request.query.name
    let state = ctx.request.query.state
    // 构建查询条件
    let where = { }
    if (name) { where.name = {[Sequelize.Op.like]: '%' + name + '%'} }
    if (state) { where.state = state }
    // 查询数据
    let results = await DeptDao.dept_list(where)

    ctx.resolve.json.bind(ctx)(results)
}

/// 新增部门
export const add = async (ctx, next) => {
    // 读取参数
    let name = ctx.request.query.name
    let pid = ctx.request.query.pid*1
    // 参数验证
    if (!name || !pid) {  throw new global.errs.ParamsIllegal() }
    if (validator.isEmpty(name, { ignore_whitespace: true })) { throw new global.errs.ParamsIllegal() }
    // 验证部门
    if (!(await DeptDao.dept_exists({id: pid}))) {
        throw new global.errs.ParamsIllegal("请选择正确的部门")
    }
    // 判断重名
    if (await DeptDao.dept_exists({pid, name})) {
        throw new global.errs.NotFound("部门已存在")
    }
    
    await DeptDao.dept_add(name, pid)

    ctx.resolve.success.bind(ctx)("成功添加部门")
}

/// 编辑部门
export const edit = async (ctx, next) => {
    // 读取参数
    let id = ctx.request.query.id*1
    let name = ctx.request.query.name
    let pid = ctx.request.query.pid*1
    // 参数验证
    if (!id || !name) { throw new global.errs.ParamsIllegal() }
    if (validator.isEmpty(name, { ignore_whitespace: true })) { throw new global.errs.ParamsIllegal() }
    let isRoot = await DeptDao.isRootDept(id)
    if ((isRoot && pid) || (!isRoot && !pid)) { throw new global.errs.ParamsIllegal() }
    // 验证部门
    if (pid && !(await DeptDao.dept_exists({id: pid}))) {
        throw new global.errs.ParamsIllegal("请选择正确的部门")
    }
    let dept = await DeptDao.dept_get({id, ...global.enums.where_notdel})
    if (!dept) {
        throw new global.errs.NotFound("要编辑的部门不存在")
    }
    // 判断重名
    if (dept.name !== name && await DeptDao.dept_exists({pid, name})) {
        throw new global.errs.NotFound("已经存在同名的部门")
    }
    
    await DeptDao.dept_edit(isRoot, id, name, pid)

    ctx.resolve.success.bind(ctx)("编辑部门成功")
}

/// 删除部门
export const del = async (ctx, next) => {
    // 读取参数
    let id = ctx.request.query.id*1
    // 参数验证
    if (!id) { throw new global.errs.ParamsIllegal() }
    let isRoot = await DeptDao.isRootDept(id)
    if (isRoot) { throw new global.errs.ParamsIllegal("根部门还请勿删") }
    // 验证部门
    if (!(await DeptDao.dept_exists({id}))) {
        throw new global.errs.NotFound("要删除的部门不存在")
    }
    await DeptDao.validate_dept_del(id)
    
    await DeptDao.dept_del(id)

    ctx.resolve.success.bind(ctx)("部门删除成功")
}