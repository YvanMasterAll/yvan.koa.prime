const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 菜单

class Menu extends Model {}

Menu.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'ID'
        },
        name: {
            type: Sequelize.STRING,
            comment: '名称'
        },
        path: {
            type: Sequelize.STRING,
            comment: '路径'
        },
        pid: {
            type: Sequelize.INTEGER, 
            comment: '上级菜单'
        },
        menu_type: {
            type: Sequelize.INTEGER,
            comment: '菜单类型，0：根菜单，1：子菜单',
            validate: { isIn: [[0, 1]] },
            defaultValue: 1
        },
        sort: {
            type: Sequelize.INTEGER,
            comment: '排序',
            defaultValue: 999
        },
        state: {
            type: Sequelize.STRING,
            defaultValue: global.enums.state.on,
            comment: '状态',
            validate: { isIn: [global.enums.state_arr] }
        }
    },
    {
        sequelize,
        tableName: 'menu'
    }
)

export default Menu

