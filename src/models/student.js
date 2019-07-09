const moment = require('moment');
const {sequelize} = require('../utils/db')
const {Sequelize, Model} = require('sequelize')

/// 学生

class Student extends Model { }

Student.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 学生名称
    name: Sequelize.STRING
}, {
    sequelize,
    tableName: 'student'
})

export default Student