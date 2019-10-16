const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')
import Role from './role'
import Permission from './permission'

/// 角色权限

class Roles_Permissions extends Model {}

Roles_Permissions.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'ID'
        },
        role_id: {
            type: Sequelize.INTEGER,
            comment: '角色ID'
        },
        permission_id: {
            type: Sequelize.INTEGER,
            comment: '权限ID'
        },
        state: {
            type: Sequelize.STRING,
            defaultValue: 'on',
            comment: '状态',
            validate: { isIn: [global.enums._state] }
        }
    },
    {
        sequelize,
        tableName: 'roles_permissions'
    }
)

// Permission.belongsToMany(Role, {through: Roles_Permissions, foreignKey: 'permission_id', constraints: false})
// Role.belongsToMany(Permission, {through: Roles_Permissions, foreignKey: 'role_id', constraints: false})

Roles_Permissions.belongsTo(Permission, {foreignKey: 'permission_id', constraints: false})
Roles_Permissions.belongsTo(Role, {foreignKey: 'role_id', constraints: false})
    
export default Roles_Permissions
