const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 权限

class Permission extends Model {}

Permission.init(
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
        alias: {
            type: Sequelize.STRING,
            comment: '别名'
        },
        pid: {
            type: Sequelize.INTEGER, 
            comment: '上级权限'
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
        tableName: 'permission'
    }
)

export default Permission