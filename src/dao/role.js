import { Roles_Permissions, Users_Roles, Roles_Menus, Role, Menu, Permission, Dept, Roles_Depts } from '../models'
const Sequelize = require('sequelize')
const { doTransaction } = require('../utils/db')
import { CommonDao } from '../dao'

class RoleDao {

    /// 获取角色列表, 查询角色信息, 包括角色的菜单权限, 资源权限和部门权限
    static async role_list(where, ctx) {
        let result = await Role.findAndCountAll({
            include: [{
                // association: Role.hasMany(Roles_Menus, {foreignKey: 'id', sourceKey: 'role_id', constraints: false}),
                association: Role.belongsToMany(Menu, {through: Roles_Menus, foreignKey: 'role_id', constraints: false}),
            }, {
                // association: Role.hasMany(Roles_Permissions, {foreignKey: 'id', sourceKey: 'role_id', constraints: false}),
                association: Role.belongsToMany(Permission, {through: Roles_Permissions, foreignKey: 'role_id', constraints: false}),
            }, {
                association: Role.belongsToMany(Dept, {through: Roles_Depts, foreignKey: 'role_id', constraints: false}),
            }], where: { ...global.enums.where_notdel, ...where },
            // order: [['id', 'DESC']],
            offset: ctx.limit*ctx.pagenum,
            limit: ctx.limit,
            distinct: true // 只计算主表数量
        })
        let count = result.count
        let results = result.rows.map(d => { return d.toJSON() })

        return {results, count}
    }

    /// 编辑菜单权限
    static async menus_edit(id, menus) {
        // 查询当前的菜单权限
        let current_menus = (await Roles_Menus.findAll({
            where: {
                role_id: id,
            }
        })).map(d => d.toJSON()).map(d => d.menu_id)
        // 开始事务
        await doTransaction(async function(transaction) {
            // 更新菜单权限
            for (var i in menus) {
                let d = menus[i]
                if (current_menus.indexOf(d) === -1) {
                    // 添加菜单权限
                    let rm = new Roles_Menus()
                    rm.role_id = id
                    rm.menu_id = d
                    await rm.save({transaction})
                }
            }
            for (var i in current_menus) {
                let d = current_menus[i]
                if (menus.indexOf(d) === -1) {
                    // 删除菜单权限
                    // await Roles_Menus.update({state: global.enums.state.del, update_at: new Date()}, {where: {role_id: id, menu_id: d}, transaction})
                    await Roles_Menus.destroy({where: {role_id: id, menu_id: d}, transaction})
                }
            }
        }, () => { throw new global.errs.DBError("数据库操作异常") })
    }

    /// 编辑资源权限
    static async permissions_edit(id, permissions) {
        // 查询当前的资源权限
        let current_permissions = (await Roles_Permissions.findAll({
            where: {
                role_id: id,
            }
        })).map(d => d.toJSON()).map(d => d.permission_id)

        // 开始事务
        await doTransaction(async function(transaction) {
            // 更新资源权限
            for (var i in permissions) {
                let d = permissions[i]
                if (current_permissions.indexOf(d) === -1) {
                    // 添加资源权限
                    let rm = new Roles_Permissions()
                    rm.role_id = id
                    rm.permission_id = d
                    await rm.save({transaction})
                }
            }
            for (var i in current_permissions) {
                let d = current_permissions[i]
                if (permissions.indexOf(d) === -1) {
                    // 删除资源权限
                    await Roles_Permissions.destroy({where: {role_id: id, permission_id: d}, transaction})
                }
            }
        }, () => { throw new global.errs.DBError("数据库操作异常") })
    }

    /// 判断角色存在
    static async role_exists(where) {
        let count = await Role.count({
            where: { ...where, ...global.enums.where }
        })
        return (count > 0)
    }

    /// 获取角色
    static async role_get(where) {
        let role = await Role.findOne({
            where: { ...where }
        })
        if (role) {
            return role.toJSON()
        }
        
        return null
    }

    /// 验证部门有效性
    static async validate_depts(depts) {
        let all_depts = (await CommonDao.depts()).map(d => d.id)
        depts.forEach(d => {
            if (all_depts.filter(d2 => d2 === d).length === 0) {
                throw new global.errs.ParamsIllegal("请选择正确的部门")
            }
        })
    }

    /// 验证菜单有效性
    static async validate_menus(menus) {
        let all_menus = (await CommonDao.menus()).map(d => d.id)
        menus.forEach(d => {
            if (all_menus.filter(d2 => d2 === d).length === 0) {
                throw new global.errs.ParamsIllegal("请选择正确的菜单")
            }
        })
    }

    /// 验证权限有效性
    static async validate_permissions(permissions) {
        let all_permissions = (await CommonDao.permissions()).map(d => d.id)
        permissions.forEach(d => {
            if (all_permissions.filter(d2 => d2 === d).length === 0) {
                throw new global.errs.ParamsIllegal("请选择正确的权限")
            }
        })
    }

    /// 验证角色是否可以删除
    static async validate_role_del(id) {
        // 判断是否存在可用用户
        let result = await Users_Roles.findOne({ where: { role_id: id }})
        if (result) { throw new global.errs.iError("无法删除该角色(存在绑定用户)") }
    }

    /// 编辑角色
    static async role_edit(id, name, level, scope, remark, depts) {
        // 查询角色所属的部门
        let current_depts = (await Roles_Depts.findAll({
            where: {
                role_id: id,
            }
        })).map(d => d.toJSON()).map(d => d.dept_id)

        // 开始事务
        await doTransaction(async function(transaction) {
            // 更新角色
            await Role.update({ name: name, level: level, scope: scope, remark: remark, update_at: new Date()
            }, { where: { id: id }, transaction})
            // 更新部门权限
            for (var i in depts) {
                let d = depts[i]
                if (current_depts.indexOf(d) === -1) {
                    // 添加部门权限
                    let rd = new Roles_Depts()
                    rd.role_id = id
                    rd.dept_id = d
                    await rd.save({transaction})
                }
            }
            for (var i in current_depts) {
                let d = current_depts[i]
                if (depts.indexOf(d) === -1) {
                    // 删除部门权限
                    await Roles_Depts.destroy({where: {role_id: id, dept_id: d}, transaction})
                }
            }
        }, () => { throw new global.errs.DBError("数据库操作异常") })
    }

    /// 新增角色
    static async role_add(name, level, scope, remark, depts) {
        // 开始事务
        await doTransaction(async function(transaction) {
            // 创建角色
            let role = new Role()
            role.name = name
            role.remark = remark
            role.scope = scope
            role.level = level
            await role.save(transaction).then(async function(r) {
                let id = r.id
                // 更新部门权限
                for (var i in depts) {
                    let d = depts[i]
                    // 添加部门权限
                    let rd = new Roles_Depts()
                    rd.role_id = id
                    rd.dept_id = d
                    await rd.save({transaction})
                }
            })
        }, () => { throw new global.errs.DBError("数据库操作异常") })
    }

    /// 删除角色
    static async role_del(id) {
        await doTransaction(async function(transaction) {
            // 删除角色绑定数据
            await Roles_Depts.destroy({ where: {role_id: id}, transaction })
            await Roles_Permissions.destroy({ where: {role_id: id}, transaction })
            await Roles_Menus.destroy({ where: {role_id: id}, transaction })
            // 删除角色
            await Role.update({ state: global.enums.state.del, update_at: new Date() }, { where: {id: id}, transaction })
        }, () => { throw new global.errs.DBError("数据库操作异常") })
    }

}

export default RoleDao