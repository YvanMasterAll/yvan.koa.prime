const moment = require('moment')
const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 用户

class User extends Model {}

User.init(
    {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        pid: Sequelize.UUID, // 上级id
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING
    },
    {
        sequelize,
        tableName: 'user'
    }
)

export default User
