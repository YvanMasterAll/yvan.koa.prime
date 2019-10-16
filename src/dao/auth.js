import { Role, Roles_Permissions, Users_Roles, Permission, Roles_Menus, Menu } from '../models'
const Sequelize = require('sequelize')
import CommonDao from './common'

class AuthDao {

    /// 获取用户角色
    static async user_roles(id) {
        return (await Users_Roles.findAll({
            include: [{
                model: Role,
                required: true,
                where: { ...global.enums.where }
            }], where: {
                user_id: id,
                ...global.enums.where
            }
        })).map(d => {
            return d.toJSON()
        }).map(d => d.Role)
    }

    /// 获取角色菜单
    static async roles_menus(roleids) {
        return (await Roles_Menus.findAll({
            include: [{
                model: Role,
                required: true,
                where: { ...global.enums.where }
            }, {
                model: Menu,
                required: true,
                where: { ...global.enums.where }
            }], where: {
                role_id: {
                    [Sequelize.Op.in]: roleids
                },
                ...global.enums.where
            }
        })).map(d => {
            return d.toJSON()
        })
    }

    /// 获取角色权限
    static async roles_permissions(roleids) {
        let results = (await Roles_Permissions.findAll({
            include: [{
                model: Role,
                required: true,
                where: { ...global.enums.where }
            }, {
                model: Permission,
                required: true,
                where: { ...global.enums.where }
            }], where: {
                role_id: {
                    [Sequelize.Op.in]: roleids
                },
                ...global.enums.where
            }
        })).map(d => {
            return d.toJSON()
        })

        let perms = results.map(d => {
            return {...d.Permission, role_id: d.Role.id}
        })

        perms = await this.splicePermissions(perms)

        return perms 
    }

    /// 获取用户的角色权限
    static async user_roles_permissions(id) {
        return (await Users_Roles.findAll({
            include: [{
                model: Role,
                required: true,
                where: { ...global.enums.where }
            }, {
                association: Users_Roles.hasMany(Roles_Permissions, {foreignKey: 'role_id', targetKey: 'role_id', constraints: false}),
                required: false,
                include: [{
                    model: Permission,
                    required: true,
                    where: { ...global.enums.where }
                }], where: { ...global.enums.where }
            }], where: {
                user_id: id,
                ...global.enums.where
            }
        })).map(d => {
            return d.toJSON()
        })
    }

    /// 整理角色权限, 拼接权限路径
    static async splicePermissions(data) {
        let results = await CommonDao.permissions()
        let perms = []
        data.forEach(r => {
            let path = r.alias
            r.path = findPath(results, path, r)
            perms.push(r)
        })
        function findPath(source, path, obj) {
            if (obj.pid === 0) {
                return path
            } else {
                let parent = source.filter(d => d.id === obj.pid)[0]
                if (!parent) {
                    return path
                } else {
                    path = path + '/' + parent.alias
                    return findPath(source, path, parent)
                }
            }
        }
        
        return perms
    }
}

export default AuthDao