const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')
import { roles } from '../middleware/permissions'

/// 角色

class Role extends Model {}

Role.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        remark: Sequelize.STRING
    },
    {
        sequelize,
        tableName: 'role'
    }
)

async function init() {
    /// 创建权限列表
    roles.forEach(async r => {
        let role = new Role()
        role.id = r.id
        role.name = r.name
        role.remark = r.remark

        await role.save()
    })
}

// TODO: 权限列表只能添加一次, 后期需要手动维护
setTimeout(() => init(), 1000)

export default Role
