const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')
import User from './user'
import Role from './role'

/// 用户角色关系

class Users_Roles extends Model {}

Users_Roles.init({
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
    user_id: {
        type: Sequelize.INTEGER,
        comment: '用户ID'
    },
    state: {
        type: Sequelize.STRING,
        defaultValue: 'on',
        comment: '状态'
    }
}, {
    sequelize,
    tableName: 'users_roles'
})

// User.belongsToMany(Role, {through: Users_Roles, foreignKey: 'user_id', constraints: false})
// Role.belongsToMany(User, {through: Users_Roles, foreignKey: 'role_id', constraints: false})

Users_Roles.belongsTo(Role, {foreignKey: 'role_id', constraints: false})
Users_Roles.belongsTo(User, {foreignKey: 'user_id', constraints: false})

export default Users_Roles