const moment = require('moment');
const {sequelize} = require('../utils/db')
const {Sequelize, Model} = require('sequelize')

/// 用户

class User extends Model { }

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //用户名
    name: Sequelize.STRING
}, {
    sequelize,
    tableName: 'user'
})

export default User