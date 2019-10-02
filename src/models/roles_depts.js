const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')
import Role from './role'
import Dept from './dept'

/// 角色所属部门, 角色权限范围

class Roles_Depts extends Model {}

Roles_Depts.init(
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
        dept_id: {
            type: Sequelize.INTEGER,
            comment: '部门ID'
        },
        state: {
            type: Sequelize.STRING,
            defaultValue: 'on',
            comment: '状态'
        }
    },
    {
        sequelize,
        tableName: 'roles_depts'
    }
)

// Dept.belongsToMany(Role, {through: Roles_Depts, foreignKey: 'dept_id', constraints: false})
// Role.belongsToMany(Dept, {through: Roles_Depts, foreignKey: 'role_id', constraints: false})

Roles_Depts.belongsTo(Dept, {foreignKey: 'dept_id', constraints: false})
Roles_Depts.belongsTo(Role, {foreignKey: 'role_id', constraints: false})
    
export default Roles_Depts
