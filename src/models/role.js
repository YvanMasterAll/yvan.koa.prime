const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 角色

class Role extends Model {}

Role.init(
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
        remark: {
            type: Sequelize.STRING,
            comment: '备注'
        },
        scope: {
            type: Sequelize.STRING,
            comment: '权限范围'
        },
        level: {
            type: Sequelize.INTEGER,
            comment: '级别'
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
        tableName: 'role'
    }
)
    
export default Role
