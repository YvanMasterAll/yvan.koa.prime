import { Role, Roles_Permissions, Users_Roles, Permission, Roles_Menus, Menu } from '../models'
const Sequelize = require('sequelize')

class AuthDao {

    /// 整理角色权限
    static async sortPermissions(data) {
        let results = (await Permission.findAll()).map (d => {
            return d.toJSON()
        })
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

    /// 获取用户角色
    static async roles(id) {
        return (await Users_Roles.findAll({
            include: [{
                model: Role,
                required: true
            }, {
                association: Users_Roles.hasMany(Roles_Permissions, {foreignKey: 'role_id', targetKey: 'role_id', constraints: false}),
                include: [{
                    model: Permission,
                    required: true
                }]
            }], where: {
                user_id: id
            }
        })).map(d => {
            return d.toJSON()
        })
    }

    /// 获取角色菜单
    static async menus(roleids) {
        return (await Roles_Menus.findAll({
            include: [{
                model: Role,
                required: true
            }, {
                model: Menu,
                required: true
            }], where: {
                role_id: {
                    [Sequelize.Op.in]: roleids
                }
            }
        })).map(d => {
            return d.toJSON()
        })
    }
}

export default AuthDao