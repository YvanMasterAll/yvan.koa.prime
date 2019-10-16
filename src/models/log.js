const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 日志

class Log extends Model {}

Log.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'ID'
        },
        name: {
            type: Sequelize.STRING,
            comment: '用户名'
        },
        description: {
            type: Sequelize.STRING,
            comment: '描述信息'
        },
        exception_detail: {
            type: Sequelize.STRING,
            comment: '异常信息'
        },
        log_type: {
            type: Sequelize.STRING,
            comment: '类型',
            defaultValue: 'success'
        },
        method: {
            type: Sequelize.STRING,
            comment: '方法'
        },
        params: {
            type: Sequelize.STRING, 
            comment: '参数'
        },
        request_ip: {
            type: Sequelize.STRING,
            comment: 'IP'
        },
        time: {
            type: Sequelize.INTEGER,
            comment: '耗时'
        },
        address: {
            type: Sequelize.STRING,
            comment: 'IP来源'
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
        tableName: 'log'
    }
)

export default Log