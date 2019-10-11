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
        sort: {
            type: Sequelize.INTEGER,
            comment: '排序',
            defaultValue: 999
        },
        state: {
            type: Sequelize.STRING,
            defaultValue: 'on',
            comment: '状态',
            validate: { isIn: global.enums._state }
        }
    },
    {
        sequelize,
        tableName: 'menu'
    }
)

export default Menu

