import { Role } from '../models'
import { UserDao, RoleDao } from '../dao'
import utils from '../utils'
const Sequelize = require('sequelize')
var _ = require('lodash')

/// 获取角色列表
export const list = async (ctx, next) => {
    // 读取参数
    let name = ctx.request.query.name
    // 构建查询条件
    let where = { }
    if (name) { where.name = {[Sequelize.Op.like]: name + '%'} }
    // 查询数据
    let {results, count} = await RoleDao.role_list(where, ctx)

    ctx.resolve.json.bind(ctx)(results, '操作成功', count)
}

/// 添加角色
export const add = async (ctx, next) => {
    // 读取参数
    let name = ctx.request.query.name
    let level = ctx.request.query.level*1
    let scope = ctx.request.query.scope
    let remark = ctx.request.query.remark
    let _depts = ctx.getarray('depts')
    let depts = []
    // 参数验证
    if (!name || !level || !scope || !(utils.stateValid(global.enums.scope, scope))) { 
        throw new global.errs.ParamsIllegal()
    }
    // 如果是自定义权限范围
    if (scope === global.enums.scope.diy) {  
        if (!_depts) { throw new global.errs.ParamsIllegal() }
        depts = _depts.map(d => d*1)
        // 验证部门
        await RoleDao.validate_depts(depts)
    }
    // 判断重名
    if (await RoleDao.role_exists({name})) {
        throw new global.errs.Exists("角色已存在")
    }
    // 创建角色
    await RoleDao.role_add(name, level, scope, remark, depts)

    ctx.resolve.success.bind(ctx)("成功添加角色")
}

/// 编辑角色
export const edit = async (ctx, next) => {
    // 读取参数
    let id = ctx.request.query.id*1
    let name = ctx.request.query.name
    let level = ctx.request.query.level*1
    let scope = ctx.request.query.scope
    let remark = ctx.request.query.remark
    let _depts = ctx.getarray('depts')
    let depts = []
     // 参数验证
     if (!id || !name || !level || !scope || !(utils.stateValid(global.enums.scope, scope))) { 
        throw new global.errs.ParamsIllegal()
    }
    // 如果是自定义权限范围
    if (scope === global.enums.scope.diy) {  
        if (!_depts) { throw new global.errs.ParamsIllegal() }
        depts = _depts.map(d => d*1)
        // 验证部门
        await RoleDao.validate_depts(depts)
    }
    // 验证角色
    let role = await RoleDao.role_get({id, ...global.enums.where_notdel})
    if (!role) {
        throw new global.errs.NotFound("要编辑的角色不存在")
    }
    // 判断重名
    if (role.name !== name && await RoleDao.role_exists({name})) {
        throw new global.errs.Exists("已经存在同名的角色")
    }
    // 超管才能编辑超管角色
    if (!ctx.state._user.isadmin && UserDao.isAdminRole(id)) {
        throw new global.errs.NoPermission("操作权限不够")
    }
    // 编辑角色
    await RoleDao.role_edit(id, name, level, scope, remark, depts)

    ctx.resolve.success.bind(ctx)("编辑角色成功")
}

/// 删除角色
export const del = async (ctx, next) => {
    // 读取参数
    let id = ctx.request.query.id*1
    // 参数验证
    if (!id) {
        throw new global.errs.ParamsIllegal()
    }
    // 验证角色
    if (!(await RoleDao.role_exists({id}))) {
        throw new global.errs.NotFound("要删除的角色不存在")
    }
    await RoleDao.validate_role_del(id)
    // 超管角色不能删除
    if (UserDao.isAdminRole(id)) {
        throw new global.errs.NoPermission("操作权限不够")
    }

    // 开始事务
    await RoleDao.role_del(id)

    ctx.resolve.success.bind(ctx)("删除角色成功")
}

/// 编辑菜单权限
export const menu_edit = async (ctx, next) => {
    // 读取参数
    let id = ctx.request.query.id*1
    let _menus = ctx.getarray('menus')
    // 参数验证
    if (!id) {  throw new global.errs.ParamsIllegal() }
    let menus = []
    if (_menus) { menus = _menus.map(d => d*1) }
    // 验证角色
    if (!(await RoleDao.role_exists({id}))) {
        throw new global.errs.NotFound("要编辑权限的角色不存在")
    }
    // 超管角色的权限不会变更
    if (UserDao.isAdminRole(id)) {
        throw new global.errs.NoPermission("操作权限不够")
    }
    // 验证菜单
    await RoleDao.validate_menus(menus)
    // 更新权限
    await RoleDao.menus_edit(id, menus)

    ctx.resolve.success.bind(ctx)("菜单分配成功")
}

/// 编辑资源权限
export const permission_edit = async (ctx, next) => {
    // 读取参数
    let id = ctx.request.query.id*1
    let _permissions = ctx.getarray('permissions')
    // 参数验证
    if (!id) { throw new global.errs.ParamsIllegal() }
    let permissions = []
    if (_permissions) { permissions = _permissions.map(d => d*1) }
    // 验证角色
    let role = await RoleDao.role_get({id, ...global.enums.where_notdel})
    if (!role) {
        throw new global.errs.NotFound("要编辑的角色不存在")
    }
    // 超管角色的权限不会变更
    if (UserDao.isAdminRole(id)) {
        throw new global.errs.NoPermission("操作权限不够")
    }
    // 验证权限, 除超管角色外都不应该有超管权限
    if (!ctx.state._user.isAdmin) {
        let cool = true
        permissions.forEach(p => {
            if (UserDao.isAdminPermission(p)) {
                cool = false
                return false
            }
        })
        if (!cool) {
            throw new global.errs.NoPermission("操作权限不够")
        }
    }
    await RoleDao.validate_permissions(permissions)
    // 更新权限
    await RoleDao.permissions_edit(id, permissions)

    ctx.resolve.success.bind(ctx)("权限分配成功")
}