const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')
import Role from './role'
import Menu from './menu'

/// 角色菜单权限, 角色权限范围

class Roles_Menus extends Model {}

Roles_Menus.init(
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
        menu_id: {
            type: Sequelize.INTEGER,
            comment: '菜单ID'
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
        tableName: 'roles_menus'
    }
)

// Menu.belongsToMany(Role, {through: Roles_Menus, foreignKey: 'menu_id', constraints: false})
// Role.belongsToMany(Menu, {through: Roles_Menus, foreignKey: 'role_id', constraints: false})

Roles_Menus.belongsTo(Menu, {foreignKey: 'menu_id', constraints: false})
Roles_Menus.belongsTo(Role, {foreignKey: 'role_id', constraints: false})
    
export default Roles_Menus
