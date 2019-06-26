const moment = require('moment');
const {sequelize} = require('../utils/db')
const {Sequelize, Model} = require('sequelize')

/// 书籍

class Book extends Model { }

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //书籍名
    name: Sequelize.STRING
}, {
    sequelize,
    tableName: 'book'
})

export default Book