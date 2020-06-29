import { User, Role, Roles_Permissions, Users_Roles, Permission, Roles_Menus, Menu } from '../models'
const Sequelize = require('sequelize')
import CommonDao from './common'

class AuthDao {

    /// 获取用户角色
    static async user_roles(id) {
        let user = await User.findOne({
            include: [{
                association: User.belongsToMany(Role, {through: Users_Roles, foreignKey: 'user_id', constraints: false}),
                where: { ...global.enums.where }
            }], where: {
                id: id,
                ...global.enums.where
            }
        })
        if (user !== null) {
            return user.toJSON().Roles
        }
        return []
    }

    /// 获取角色菜单
    static async roles_menus(roleids) {
        return (await Roles_Menus.findAll({
            include: [{
                model: Role,
                where: { ...global.enums.where }
            }, {
                model: Menu,
                where: { ...global.enums.where }
            }], where: {
                role_id: {
                    [Sequelize.Op.in]: roleids
                },
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
                where: { ...global.enums.where }
            }, {
                model: Permission,
                where: { ...global.enums.where }
            }], where: {
                role_id: {
                    [Sequelize.Op.in]: roleids
                },
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
                where: { ...global.enums.where }
            }, {
                association: Users_Roles.hasMany(Roles_Permissions, {foreignKey: 'role_id', sourceKey: 'role_id', constraints: false}),
                required: false,
                include: [{
                    model: Permission,
                    where: { ...global.enums.where }
                }]
            }], where: {
                user_id: id,
            }
        })).map(d => {
            return d.toJSON()
        })
    }

    /// 整理资源权限, 拼接权限路径
    /// 比如说我有用户(user)查询(list)的权限，那么拼接出来的路径应该就是：user/list
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
                    path = parent.alias + '/' + path
                    return findPath(source, path, parent)
                }
            }
        }
        
        return perms
    }
}

export default AuthDao