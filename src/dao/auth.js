import { Role, Roles_Permissions, Users_Roles, Permission, Roles_Menus, Menu } from '../models'
const Sequelize = require('sequelize')
import redis from '../utils/redis'

class AuthDao {

    /// 整理角色权限
    static async sortPermissions(data) {
        let results = (await Permission.findAll({where: {...global.enums.where}})).map (d => {
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

    /// 获取用户角色加权限
    static async roles_permissions(id) {
        return (await Users_Roles.findAll({
            include: [{
                model: Role,
                required: true,
                where: { ...global.enums.where }
            }, {
                association: Users_Roles.hasMany(Roles_Permissions, {foreignKey: 'role_id', targetKey: 'role_id', constraints: false}),
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

    /// 获取角色菜单
    static async menus(roleids) {
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
    static async permissions(roleids, userid) {
        // // 查看缓存, 
        // // TODO: 权限修改后需要更新缓存, 简单一点直接删除缓存但是可能会有性能问题, 换一种方法是通过添加一个时间做参考
        // let redis_perms = await redis.hget_json(global.config.redis_keys.user_permissions, userid)
        // if (redis_perms) {
        //     return redis_perms
        // }

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

        perms = await this.sortPermissions(perms)
        
        // // 缓存存储
        // await redis.hset_json(global.config.redis_keys.user_permissions, userid, perms)

        return perms 
    }
}

export default AuthDao