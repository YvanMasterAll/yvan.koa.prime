const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')
import User from './user'
import Role from './role'

/// 用户角色关系

class Users_Roles extends Model {}

Users_Roles.init({
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    // 用户标识
    userid: Sequelize.UUID,
    // 角色标识
    roleid: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: 'users_roles'
})

User.belongsToMany(Role, {through: Users_Roles, foreignKey: 'userid', constraints: false})
Role.belongsToMany(User, {through: Users_Roles, foreignKey: 'roleid', constraints: false})

export default Users_Roles