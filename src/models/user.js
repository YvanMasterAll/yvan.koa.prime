const moment = require('moment')
const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 用户

class User extends Model {}

User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID'
        },
        name: {
            type: Sequelize.STRING,
            commit: '名称'
        },
        password: {
            type: Sequelize.STRING,
            commit: '密码'
        },
        avatar: {
            type: Sequelize.STRING,
            commit: '头像',
            defaultValue: global.config.db.avatar
        },
        email: {
            type: Sequelize.STRING,
            commit: '邮箱'
        },
        phone: {
            type: Sequelize.STRING,
            commit: '电话号码'
        },
        dept_id: {
            type: Sequelize.INTEGER,
            comment: '部门ID'
        },
        job_id: {
            type: Sequelize.INTEGER,
            comment: '岗位ID'
        }
    },
    {
        sequelize,
        tableName: 'user'
    }
)

export default User
