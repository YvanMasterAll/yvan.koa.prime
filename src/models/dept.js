const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 部门

class Dept extends Model {}

Dept.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'ID'
        },
        pid: {
            type: Sequelize.INTEGER, 
            comment: '上级部门'
        },
        name: {
            type: Sequelize.STRING,
            comment: '名称'
        },
        state: {
            type: Sequelize.STRING,
            defaultValue: 'on',
            comment: '状态'
        }
    },
    {
        sequelize,
        tableName: 'dept'
    }
)

export default Dept
